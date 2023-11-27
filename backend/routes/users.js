const router = require('express').Router();

const {
  getUsers,
  getUserId,
  loadUsers,
  loadAvatar,
  infoUsers,
} = require('../controllers/users');

const {
  userIdValidate,
  loadUsersValidate,
  loadAvatarValidate,
} = require('../middlewares/validity');

router.get('/', getUsers);
router.get('/me', infoUsers);
router.get('/:userId', userIdValidate, getUserId);
router.patch('/me', loadUsersValidate, loadUsers);
router.patch('/me/avatar', loadAvatarValidate, loadAvatar);

module.exports = router;

