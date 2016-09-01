let shortid = require('shortid')

const requiredProperties = ['message', 'game', 'date', 'time']

exports.post = function*(request, response) {
	let user = request.user

	if(!user) {
		response.writeHead(400)
		return response.end('Not logged in')
	}

	for(let property of requiredProperties) {
		if(!request.body[property]) {
			response.writeHead(400)
			return response.end(`Required field '${property}' is missing`)
		}
	}

	let id = shortid.generate()
	let body = request.body

	yield db.set('Hangouts', id, {
		id,
		message: body.message,
		game: body.game,
		date: body.date,
		time: body.time
	})

	response.end(id)
}