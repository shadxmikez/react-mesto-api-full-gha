const router = require('express').Router();

const {
  getCards,
  createCards,
  deleteCarsdId,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidate, cardIdValidate,
} = require('../middlewares/validity');

router.get('/', getCards);
router.post('/', createCardValidate, createCards);
router.delete('/:cardId', cardIdValidate, deleteCarsdId);
router.put('/:cardId/likes', cardIdValidate, likeCard);
router.delete('/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = router;