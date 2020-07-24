const rootRoutes = require('express').Router()
const rootController = require('../controllers/rootController')

rootRoutes.post('/',async function(req, res) {
    try{
        var returnMessage = await rootController.checkServer().catch(err => { throw new Error(err) })
        res.status(200).send('Received data: \n' + JSON.stringify(req.body))
    }
    catch(err){
        res.status(500).send('Internal Server Error')
    }
    
})

rootRoutes.get('/',async function(req, res, next) {
    try{
        var returnMessage = await rootController.checkServer().catch(err => { throw new Error(err) })
        res.status(200).send(returnMessage)
    }
    catch(err){
        res.status(500).send('Internal Server Error')
    }
    
})

module.exports = rootRoutes