import createError from './create-error.util.js';

export default function checkIdentity(identity) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  if (emailRegex.test(identity)) {
    return 'email';
  }

  if (phoneRegex.test(identity)) {
    return 'phone';
  }

  throw createError(400, 'identity must be a valid email or phone number');
}