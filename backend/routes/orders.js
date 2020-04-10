const router = require('express').Router();
const OrderController = require('../controllers/OrderController.js');

router.get('/', OrderController.getAll);
router.get('/:orderId', OrderController.getByPK);
router.get('/user/:userId', OrderController.getByUser);
router.post('/', OrderController.insert)
router.put('/:id', OrderController.modify);
router.delete('/:id', OrderController.delete);

module.exports = router;