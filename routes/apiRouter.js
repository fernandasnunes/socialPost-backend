const controller = require('../controllers/apiController.js')
const usersRouters = require('express').Router()


// let router = require('express').Router()

usersRouters.post('/', (async (req, res, next) => {
    try {
        let result = await controller.registerUser(req.body.name, req.body.age, req.body.email).catch(err => { throw new Error(err) })
        res.status(200).send({
            message: 'Usuário cadastrado com sucesso',
            result: {
                id: result._id,
                name: result.name,
                age: result.age,
                email: result.email
                
            }
        })
    } catch (err) {
        res.status(500).send('Não foi possivel cadastrar o usuário!')
    }
}))

module.exports = usersRouters
