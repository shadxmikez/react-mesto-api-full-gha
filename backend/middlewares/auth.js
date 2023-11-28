const jwt = require('jsonwebtoken');

const ErrorAuth = require('../errors/ErrorAuth');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ErrorAuth('Необходима авторизация'));
  }
  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new ErrorAuth('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;