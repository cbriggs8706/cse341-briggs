const routes = require('express').Router()
const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

routes.get('/', async (req, res, next) => {
	try {
		const collection = mongodb.getDb().collection('contacts')
		const id = req.query.id

		if (id !== undefined) {
			if (typeof id !== 'string' || !ObjectId.isValid(id)) {
				return res.status(400).json({ message: 'Invalid contact ID' })
			}

			const contact = await collection.findOne({
				_id: new ObjectId(id),
			})

			if (!contact) {
				return res.status(404).json({ message: 'Contact not found' })
			}

			return res.json(contact)
		}

		const contacts = await collection.find({}).toArray()
		res.json(contacts)
	} catch (err) {
		next(err)
	}
})

module.exports = routes
