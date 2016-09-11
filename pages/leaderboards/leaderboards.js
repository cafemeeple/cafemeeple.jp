exports.get = function*(request, response) {
	let count = {}

	yield db.forEach('Hangouts', hangout => {
		hangout.members.forEach(member => {
			if(count[member] !== undefined)
				count[member] += 1
			else
				count[member] = 1
		})
	})

	let userIds = Object.keys(count).sort((a, b) => count[a] - count[b])
	let users = yield db.getMany('Users', userIds)

	response.render({
		users
	})
}