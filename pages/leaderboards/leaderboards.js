exports.get = function*(request, response) {
	let count = {}

	yield db.forEach('Hangouts', hangout => {
		if(count[hangout.userId] !== undefined)
			count[hangout.userId] += 1
		else
			count[hangout.userId] = 1
	})

	let userIds = Object.keys(count).sort((a, b) => count[a] - count[b])
	let users = yield db.getMany('Users', userIds)

	response.render({
		users
	})
}