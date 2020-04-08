const {
    Products,
    Sequelize
} = require('../models/index.js');
const Op = Sequelize.Op;

const ProductsController = {
    getAll(req, res) {
        Category.findAll()
            .then(products => res.send(products))
    },
    getByPK(req, res) {
        Products.findAll({
                where: {
                    id: req.params.productId
                }
            })
            .then(products => res.send(products))
    },
    getByQuery(req, res) {
        Products.findAll({
                where: {
                    name: {
                        [Op.like]: '%'+ req.params.query +'%'
                    }
                }
            })
            .then(products => res.send(products))
    },
    insert(req, res) {
        products.create({
                name: req.body.name
            })
            .then(products => res.send({
                products,
                message: 'Producto creada con éxito'
            }))
            .catch(err => res.send({
                message: 'Hubo un problema para crear el producto'
            }))
    },
    modify(req, res) {
        products.update({
                ...req.body
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(category => res.send({
                products,
                message: 'Peoducto modificada con éxito'
            }))
            .catch(err => res.send({
                message: 'Hubo un problema para modificar el producto'
            }))
    },
    delete(req, res) {
        Category.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(category => res.send({
                products,
                message: 'Producto eliminada con éxito'
            }))
            .catch(err => res.send({
                message: 'Hubo un problema para eliminar el producto'
            }))
    }
}

module.exports = ProductsController;