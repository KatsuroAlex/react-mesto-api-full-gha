const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const cardRouter = require('./cards');
const userRouter = require('./users');
const NotFoundError = require('../errors/notFoundError');
// const {
//   ERROR_NOT_FOUND,
// } = require('../errors/constants');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Неверный формат ссылки на изображение');
    }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) return value;
      return helpers.message('Неверный формат почты');
    }),
    password: Joi.string().required().min(4).max(36),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    // name: Joi.string().min(2).max(30),
    // about: Joi.string().min(2).max(30),
    // avatar: Joi.string().custom((value, helpers) => {
    //   if (validator.isURL(value)) return value;
    //   return helpers.message('Неверный формат ссылки на изображение');
    // }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) return value;
      return helpers.message('Неверный формат почты');
    }),
    password: Joi.string().required().min(4).max(36),
  }),
}), login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.get('/logout', (req, res) => {
  res.clearCookie('token').send();
});

router.use((req, res, next) => {
  next(new NotFoundError(`Запрашиваемый ресурс по адресу '${req.path}' не найден`));
});

module.exports = router;
