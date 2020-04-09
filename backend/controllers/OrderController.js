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
                where: {
                    id: req.params.orderId
                }
            })
            .then(orders => res.send(orders))
    },
    getByQuery(req, res) {
        Order.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + req.params.query + '%'
                    }
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
            .then(orders => res.send({
                orders,
                message: 'Pedido creado con éxito'
            }))
            .catch(err => res.send({
                message: 'Hubo un problema para crear el pedido'
            }))
    },
    modify(req, res) {
        Order.update({
                ...req.body
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