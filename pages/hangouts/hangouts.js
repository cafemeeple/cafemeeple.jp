exports.get = function*(request, response) {
	let hangouts = yield db.all('Hangouts')

	hangouts.sort((a, b) => {
		if(a.date === b.date)
			return a.time - b.time
		else
			return b.date - a.date
	})

	for(let hangout of hangouts) {
		hangout.membersAsUsers = yield db.getMany('Users', hangout.members)
	}

	response.render({
		user: request.user,
		hangouts
	})
}