const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res, next) => {
	const results = await mongodb.getDb().collection('contacts').find()
	results.toArray().then((lists) => {
		res.setHeader('Content-Type', 'application/json')
		res.status(200).json(lists)
	})
}

const getSingle = async (req, res, next) => {
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

module.exports = { getAllContacts: getAll, getContactById: getSingle }
