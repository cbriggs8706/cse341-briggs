const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

const getAllContacts = async (req, res, next) => {
	/* #swagger.responses[200] = {
  description: 'All contacts.',
  schema: [{ $ref: '#/definitions/Contact' }]
} */
	const results = await mongodb.getDb().collection('contacts').find()
	results.toArray().then((lists) => {
		res.setHeader('Content-Type', 'application/json')
		res.status(200).json(lists)
	})
}

const getContactById = async (req, res, next) => {
	/* #swagger.responses[200] = {
  description: 'The requested contact.',
  schema: { $ref: '#/definitions/Contact' }
} */
	const userId = new ObjectId(req.params.id)
	const result = await mongodb
		.getDb()
		.collection('contacts')
		.find({ _id: userId })
	result.toArray().then((lists) => {
		res.setHeader('Content-Type', 'application/json')
		res.status(200).json(lists[0])
	})
}

const createContact = async (req, res) => {
	/* #swagger.parameters['body'] = {
  in: 'body',
  required: true,
  description: 'The contact to create.',
  schema: { $ref: '#/definitions/Contact' }
	
} */
	const contact = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		favoriteColor: req.body.favoriteColor,
		birthday: req.body.birthday,
	}
	const response = await mongodb
		.getDb()
		.collection('contacts')
		.insertOne(contact)
	if (response.acknowledged) {
		res.status(201).json(response)
	} else {
		res
			.status(500)
			.json(response.error || 'Some error occurred while creating the contact.')
	}
}

const updateContact = async (req, res) => {
	/* #swagger.parameters['body'] = {
  in: 'body',
  required: true,
  description: 'The contact to update.',
  schema: { $ref: '#/definitions/Contact' }
	
} */
	const userId = new ObjectId(req.params.id)
	const contact = req.body
	const result = await mongodb
		.getDb()
		.collection('contacts')
		.updateOne({ _id: userId }, { $set: contact })
	if (result.matchedCount === 0) {
		return res.status(404).json({ message: 'Contact not found' })
	}
	res.status(200).json({ message: 'Contact updated successfully' })
}

const deleteContact = async (req, res) => {
	const userId = new ObjectId(req.params.id)
	const result = await mongodb
		.getDb()
		.collection('contacts')
		.deleteOne({ _id: userId })
	if (result.deletedCount === 0) {
		return res.status(404).json({ message: 'Contact not found' })
	}
	res.status(200).json({ message: 'Contact deleted successfully' })
}

module.exports = {
	getAllContacts: getAllContacts,
	getContactById: getContactById,
	createContact: createContact,
	updateContact: updateContact,
	deleteContact: deleteContact,
}
