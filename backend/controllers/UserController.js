const { User, Token } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const { jwt_secret } = require('../config/config.json')[env];

const UserController = {
    getAll(req, res) {
        User.findAll({
            })
            .then(users => res.send(users))
    },
    async register(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, 9);
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password,
                role: 'customer'
            });
            res.status(201).send({
                user,
                message: 'Usuario creado con éxito'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Hubo un problema al tratar de crear el usuario'
            });
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            console.log(user);
            if (!user) {
                return res.status(400).send({
                    message: 'Email o contraseña incorrectas'
                })
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    message: 'Email o contraseña incorrectas'
                })
            }
            const token = jwt.sign({
                id: user.id
            }, jwt_secret);
            Token.create({
                token,
                UserId: user.id
            });
            //status es 200 by default
            res.send({
                message: 'Bienvenid@ ' + user.name,
                user,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Hubo un problema al tratar de iniciar sesión'
            });
        }
    },
    getInfo(req,res){
        res.send(req.user);
    }
}
module.exports = UserController;