const routes = require('express').Router()
const contactsController = require('../controllers/contacts')

routes.get('/', contactsController.getAllContacts)
routes.get('/:id', contactsController.getContactById)
routes.post('/', contactsController.createContact)
routes.put('/:id', contactsController.updateContact)
routes.delete('/:id', contactsController.deleteContact)

module.exports = routes
