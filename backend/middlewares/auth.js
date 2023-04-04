const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const auth = (req, res, next) => {
const { token } = req.cookies;
  // const { authorization } = req.headers;
  // const authorization = req.header('Authorization');


    // if (!authorization || !authorization.startsWith('Bearer ')) {
    //   throw new AuthError(AUTH_ERROR_MESSAGE);
    // }

    // const token = authorization.replace('Bearer ', '');
    // const { token } = req.headers;
    console.log(token);

  if (!token) {
    return next(new AuthError('Токен остутствует или некорректен'));
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new AuthError('Токен не верифицирован, авторизация не пройдена'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
