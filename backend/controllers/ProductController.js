const {
    Product,
    Category,
    Sequelize
} = require('../models/index.js');
const Op = Sequelize.Op;

const ProductsController = {
    getAll(req, res) {
        Product.findAll({
                include: [Category]
            })
            .then(products => res.send(products))
    },
    getByPK(req, res) {
        Product.findAll({
                where: {
                    id: req.params.productId
                }
            })
            .then(products => res.send(products))
    },
    getByQuery(req, res) {
        Product.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + req.params.query + '%'
                    }
                }
            })
            .then(products => res.send(products))
    },
    getByCategory(req, res) {
        //hacer un findall y que me traiga los que tienen categoryid == al id que le paso

    }, //Falta hacer

    insert(req, res) {
        Product.create({
                ...req.body
            })
            .then(products => res.send({
                products,
                message: 'Producto creado con éxito'
            }))
            .catch(err => res.send({
                message: 'Hubo un problema para crear el producto'
            }))
    },
    modify(req, res) {
        Product.update({
                ...req.body
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(products => res.send({
                products,
                message: 'Producto modificado con éxito'
            }))
            .catch(err => res.send({
                message: 'Hubo un problema para modificar el producto'
            }))
    },
    delete(req, res) {
        Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(products => res.send({
                products,
                message: 'Producto eliminado con éxito'
            }))
            .catch(err => res.send({
                message: 'Hubo un problema para eliminar el producto'
            }))
    }
}

module.exports = ProductController;