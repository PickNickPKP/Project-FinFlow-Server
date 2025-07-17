import prisma from '../config/prisma.config.js'
import createError from '../utils/create-error.util.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// ✅ REGISTER (YUP version)
export async function registerYup(req, res, next) {
  try {
    const { email, phone, username, password, capital } = req.body;

    if (email) {
      const existingEmail = await prisma.user.findUnique({ where: { email } });
      if (existingEmail) {
        throw createError(409, `Email ${email} is already registered`);
      }
    }

    if (phone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone } });
      if (existingPhone) {
        throw createError(409, `Phone ${phone} is already registered`);
      }
    }

    const newUser = await prisma.user.create({
      data: {
        email: email || null,
        phone: phone || null,
        username,
        password: await bcrypt.hash(password, 10),
        capital: parseFloat(capital || 0),
        role: 'user' // ✅ ตั้งค่า default role เป็น user
      }
    });

    const { password: _, createdAt, updatedAt, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'Register successful',
      user: userWithoutPassword
    });

  } catch (err) {
    next(err);
  }
}

// ✅ LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;
    const identityKey = email ? 'email' : 'phone';
    const identityValue = email || phone;

    const foundUser = await prisma.user.findUnique({
      where: { [identityKey]: identityValue }
    });

    if (!foundUser) {
      throw createError(401, 'Invalid login');
    }

    const pwOk = await bcrypt.compare(password, foundUser.password);
    if (!pwOk) {
      throw createError(401, 'Invalid login');
    }

    // ✅ ใส่ role ลงใน token
    const payload = {
      id: foundUser.id,
      role: foundUser.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '15d'
    });

    const { password: _, createdAt, updatedAt, ...userData } = foundUser;

    res.json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (err) {
    next(err);
  }
}

// ✅ GET CURRENT USER
export const getMe = async (req, res, next) => {
  res.json({ user: req.user });
}
