const router = require('express').Router();
const OrderController = require('../controllers/OrderController.js');

router.get('/', OrderControlle.getAll);
router.get('/:categoryId', OrderControlle.getByPK);
router.get('/byQuery/:query', OrderControlle.getByQuery);
router.post('/', OrderControlle.insert)
router.put('/:id', OrderControlle.modify);
router.delete('/:id', OrderControlle.delete);

module.exports = router;