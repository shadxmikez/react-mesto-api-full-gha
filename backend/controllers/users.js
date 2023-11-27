const { CastError, ValidationError } = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ErrorNotFound = require('../errors/ErrorNotFound'); // 404
const ErrorCode = require('../errors/ErrorCode'); // 400
const ErrorEmail = require('../errors/ErrorEmail'); // 409

const {
  STATUS_CREATED,
  OK,
} = require('../const/const'); // 200 OK // 201 STATUS_CREATED

const getUsers = (req, res, next) => {
  return User.find()
    .then((data) => res.send(data))
    .catch(next);
}

const infoUsers = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

const getUserId = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new ErrorCode('Переданы некорректные данные, id c таким пользователем нет'));
      } else {
        next(err);
      }
    });
}

const createUsers = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(STATUS_CREATED).send({
      data: { name, about, avatar, email },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ErrorEmail('Пользователь с таким email уже существует!'));
        return;
      }
      if (err instanceof ValidationError) {
        const failMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join();
        next(new ErrorCode(`Некорректные данные: ${failMessage}`));
      } else {
        next(err);
      }
    });
};

const changeUsersInfoDecorator = (req, res, next, changeUsers) => {
  const { _id: userId } = req.user;
  User.findByIdAndUpdate(
    userId,
    changeUsers,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Такого пользователя нет');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        const failMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join();
        next(new ErrorCode(`Некорректные данные: ${failMessage}`));
        return;
      } else {
        next(err);
      }
    });
};


const loadUsers = (req, res, next) => {
  const { name, about } = req.body;
  const changeUsers = { name, about };
  changeUsersInfoDecorator(req, res, next, changeUsers);
};

const loadAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const changeUsers = { avatar };
  changeUsersInfoDecorator(req, res, next, changeUsers);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.status(OK).send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserId,
  loadUsers,
  loadAvatar,
  infoUsers,
  createUsers,
  login,
};
