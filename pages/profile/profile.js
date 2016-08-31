exports.get = function*(request, response) {
	response.render({
		user: request.user
	})
}