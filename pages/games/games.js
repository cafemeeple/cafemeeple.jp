exports.get = function*(request, response) {
	let user = request.user
	let gameId = request.params[0]

	if(gameId) {
		let game = yield db.get('Games', gameId)

		response.render({
			user,
			game
		})
	} else {
		let games = yield db.all('Games')

		response.render({
			user,
			games
		})
	}
}