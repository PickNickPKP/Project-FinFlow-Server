import jwt from 'jsonwebtoken'
import createError from '../utils/create-error.util.js'
import { getUserBy } from '../services/user.service.js'

export default async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw createError(401, 'Unauthorized: Missing or invalid token format')
    }

    const token = authorization.split(' ')[1]
    if (!token) {
      throw createError(401, 'Unauthorized: Token not found')
    }

    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET)
      // ตัวอย่าง payload: { id: 123, iat: ..., exp: ... }
    } catch (err) {
      throw createError(401, 'Unauthorized: Invalid or expired token')
    }

    // ค้นหา user จาก DB
    const foundUser = await getUserBy('id', payload.id)
    if (!foundUser) {
      throw createError(401, 'Unauthorized: User not found')
    }

    // ตัด field ที่ไม่จำเป็น
    const { password, createdAt, updatedAt, ...userData } = foundUser

    // แนบ user ให้ req
    req.user = userData

    next()
  } catch (err) {
    next(err)
  }
}
