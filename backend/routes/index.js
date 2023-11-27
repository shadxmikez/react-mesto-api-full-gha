const router = require('express').Router();
const Users = require('./users');
const Cards = require('./cards');

const auth = require('../middlewares/auth');

const ErrorNotFound = require('../errors/ErrorNotFound');

const { createUsers, login } = require('../controllers/users');
const { signinValidate, signupValidate } = require('../middlewares/validity');

router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUsers);

router.use('/users', auth, Users);
router.use('/cards', auth, Cards);

router.use('/*', (req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

module.exports = router;

