const awesomeFunction = (req, res, next) => {
	res.send('Terry Briggs')
}

const returnAnotherPerson = (req, res, next) => {
	res.send('Awesome person')
}

module.exports = { awesomeFunction, returnAnotherPerson }
