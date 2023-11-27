const { CastError, ValidationError } = require('mongoose').Error;
const Card = require('../models/card');
const ErrorCode = require('../errors/ErrorCode');
const ErrorCardDeleted = require('../errors/ErrorCardDelete');
const ErrorNotFound = require('../errors/ErrorNotFound');
const {
  STATUS_CREATED,
  OK,
} = require('../const/const');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

const createCards = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;

  Card.create({ name, link, owner: userId })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        const failMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new ErrorCode(`Некорректные данные: ${failMessage}`));
      } else {
        next(err);
      }
    });
};

const deleteCarsdId = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Карта не найдена');
      }
      if (userId !== card.owner.toString()) {
        throw new ErrorCardDeleted('Вы не можете удалить не свою карточку');
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new ErrorCode('Неправильный id карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Карта не найдена');
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorCode('Неправильный id карточки'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Карта не найдена');
      }
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorCode('Неправильный id карточки'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCarsdId,
  likeCard,
  dislikeCard,
};
