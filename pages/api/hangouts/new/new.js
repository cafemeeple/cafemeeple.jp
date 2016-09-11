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
	let gameTitleMatches = yield db.filter('Games', game => game.title.toLowerCase() === body.game.toLowerCase())
	let gameId = (gameTitleMatches.length === 1) ? gameTitleMatches[0].id : null

	yield db.set('Hangouts', id, {
		id,
		userId: user.id,
		members: [user.id],
		message: body.message,
		gameId,
		gameTitle: body.game,
		date: body.date,
		time: body.time,
		created: (new Date()).toISOString()
	})

	response.end(id)
}