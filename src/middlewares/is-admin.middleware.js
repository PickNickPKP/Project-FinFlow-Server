import createError from '../utils/create-error.util.js';

export default function isAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return next(createError(403, 'Access denied: Admins only'));
  }
  next();
}
