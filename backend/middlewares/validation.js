const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

// вспомогательная ф-ия проверки id
const checkedId = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (ObjectId.isValid(value)) return value;
    return helpers.message('Невалидный id');
  });

// вспомогательная ф-ия проверки ссылки
const checkedLink = Joi.string()
  .custom((value, helpers) => {
    if (validator.isURL(value)) return value;
    return helpers.message('Неверный формат ссылки на изображение');
  });

const validateCard = celebrate({
  params: Joi.object().keys({
    cardId: checkedId,
  }),
});

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: checkedLink,
  }),
});

module.exports = {
  validateCard,
  validateUserProfile,
  validateUserAvatar,
};
