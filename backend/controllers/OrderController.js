const {
    Order,
    Product,
    Sequelize
} = require('../models/index.js');
const Op = Sequelize.Op;

const OrderController = {
    getAll(req, res) {
        Order.findAll({
                include: [Product]
            })
            .then(orders => res.send(orders))
    },
    getByPK(req, res) {
        Order.findAll({
                include: [Product],
                where: {
                    id: req.params.orderId
                }
            })
            .then(orders => res.send(orders))
    },
    getByUser(req, res) {
        Order.findAll({
                include: [Product],
                where: {
                    UserId: req.params.userId
                }
            })
            .then(orders => res.send(orders))
    },
    getByCategory(req, res) {
        //hacer un findall y que me traiga los que tienen categoryid == al id que le paso

    }, //Falta hacer

    insert(req, res) {
        Order.create({
                ...req.body
            })
            .then(order => {
                req.body.products.forEach(product => {
                    order.addProduct(product[0], {
                        through: {
                            units: product[1]
                        }
                    })
                });
                res.send({
                    order,
                    message: 'Pedido creado con éxito'
                })
            })
            .catch(err => {
                console.log(err)
                res.send({
                    message: 'Hubo un problema para crear el pedido'
                })
            })
    },
    modify(req, res) {
        Order.update({
                status: req.body.status,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(orders => res.send({
                orders,
                message: 'Pedido modificado con éxito'
            }))
            .catch(err => res.send({
                message: 'Hubo un problema para modificar el Pedido'
            }))
    },
    delete(req, res) {
        Order.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(orders => res.send({
                orders,
                message: 'Pedido eliminado con éxito'
            }))
            .catch(err => res.send({
                message: 'Hubo un problema para eliminar el pedido'
            }))
    }
}


module.exports = OrderController;