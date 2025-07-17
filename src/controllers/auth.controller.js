import prisma from '../config/prisma.config.js'
import createError from '../utils/create-error.util.js'
import bcrypt from 'bcryptjs'
// import checkIdentity from '../utils/check-identity.util.js'

// export async function register(req, res, next) {
//   try {
//     const { identity, username, password, confirmPassword, capital } = req.body;

//     if (!identity || !username || !password || !confirmPassword) {
//       throw createError(400, 'Please provide all required fields');
//     }

//     if (password !== confirmPassword) {
//       throw createError(400, 'Passwords do not match');
//     }

//     const identityKey = checkIdentity(identity); // returns 'email' or 'phone'

//     const existingUser = await prisma.user.findUnique({
//       where: { [identityKey]: identity }
//     });

//     console.log('existingUser:', existingUser);

//     if (existingUser) {
//       throw createError(409, This ${identityKey} is already registered);
//     }

//     const newUser = await prisma.user.create({
//       data: {
//         [identityKey]: identity,
//         username,
//         password: await bcrypt.hash(password, 10),
//         capital: parseFloat(capital || 0)
//       }
//     });

//     const { password: _, ...userWithoutPassword } = newUser;

//     res.status(201).json({
//       message: 'User registered successfully',
//       user: userWithoutPassword
//     });

//   } catch (err) {
//     next(err);
//   }
// }

export async function registerYup(req, res, next) {
  try {
    const { email, phone, username, password, capital } = req.body;

    // Check if email is already registered
    if (email) {
      const existingEmail = await prisma.user.findUnique({ where: { email } });
      if (existingEmail) {
        throw createError(409, `Email ${email} is already registered`);
      }
    }

    // Check if phone is already registered
    if (phone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone } });
      if (existingPhone) {
        throw createError(409, `Phone ${phone} is already registered`);
      }
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: email || null,
        phone: phone || null,
        username,
        password: await bcrypt.hash(password, 10),
        capital: parseFloat(capital || 0)
      }
    });

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'Register successful',
      user: userWithoutPassword
    });

  } catch (err) {
    next(err);
  }
}


export const login = (req,res,next)=>{
  console.log(req.body)
   res.json({
    msg: 'Login controller',
    body: req.body
  })
}