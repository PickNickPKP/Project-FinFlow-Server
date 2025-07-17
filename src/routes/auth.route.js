import express from 'express'
import * as authController from "../controllers/auth.controller.js";
import { loginSchema, registerSchema, validate } from '../validations/validator.js'
import authenticate from '../middlewares/authenticate.middleware.js'
import isAdmin from '../middlewares/is-admin.middleware.js';

const authRoute = express.Router()

// Register / Login
authRoute.post('/login', validate(loginSchema), authController.login)
authRoute.post('/register', validate(registerSchema), authController.registerYup)

// Authenticated user
authRoute.get('/me', authenticate, authController.getMe)

// ✅ Admin only route
authRoute.get('/admin-only', authenticate, isAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin', user: req.user })
})

export default authRoute
