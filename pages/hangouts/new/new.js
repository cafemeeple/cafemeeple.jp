exports.get = function*(request, response) {
	let games = yield db.all('Games')

	response.render({
		games
	})
}