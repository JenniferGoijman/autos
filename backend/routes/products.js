const router = require('express').Router();
const ProductsController = require('../products/ProductsController.js');

router.get('/', ProductsController.getAll);
router.get('/:categoryId', ProductsController.getByPK);
router.get('/byQuery/:query', ProductsController.getByQuery);
router.post('/', ProductsController.insert)
router.put('/:id', ProductsController.modify);
router.delete('/:id', ProductsController.delete);

module.exports = router;