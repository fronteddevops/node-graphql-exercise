import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.user = null;
    return next();
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, 'secret');
    req.user = payload.sub ? { id: payload.sub } : null;
  } catch (err) {
    req.user = null;
  }
  next();
};
