import createError from "../utils/create-error.util.js";
import { object, string, ref, number } from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/;

export const registerSchema = object({
  username: string().required(),
  identity: string()
    .required('Please provide identity (email or phone)')
    .test('identity-check', 'Invalid identity format', value =>
      emailRegex.test(value) || mobileRegex.test(value)
    ),
  password: string().min(4).required(),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required(),
  capital: number().required(),
}).noUnknown(); 

export const loginSchema = object({
  identity: string().required(),
  password: string().required(),
});


export const validate = (schema, options = {}) => {
  return async function (req, res, next) {
    try {
      let cleanBody = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
        ...options
      });

      if (cleanBody.identity) {
        const isEmail = emailRegex.test(cleanBody.identity);
        cleanBody = {
          ...cleanBody,
          [isEmail ? 'email' : 'phone']: cleanBody.identity,
        };
        delete cleanBody.identity;
      }

      req.body = cleanBody;
      next();
    } catch (err) {
      const errMsg = err.errors.join(" ||| ");
      console.log("Yup Validation Error:", errMsg);
      return next(createError(400, errMsg));
    }
  };
};
