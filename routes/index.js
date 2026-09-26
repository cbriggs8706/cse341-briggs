const routes = require('express').Router()

const myController = require('../controllers')

routes.get('/', myController.awesomeFunction)
routes.get('/awesome', myController.returnAnotherPerson)
routes.use('/contacts', require('./contacts'))

module.exports = routes
