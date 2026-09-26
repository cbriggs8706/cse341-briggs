var express = require('express')
const mongodb = require('./db/connect')

const port = process.env.PORT || 8080
var app = express()

app.use('/', require('./routes'))

mongodb.initDb((err) => {
	if (err) {
		console.log(err)
	} else {
		app.listen(port)
		console.log(`Connected to DB and listening on ${port}`)
	}
})
