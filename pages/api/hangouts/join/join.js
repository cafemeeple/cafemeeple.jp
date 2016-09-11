exports.post = app.HangoutController(function*(user, id) {
	let hangout = yield db.get('Hangouts', id)

	if(hangout.members.indexOf(user.id) === -1)
		hangout.members.push(user.id)

	yield db.set('Hangouts', id, hangout)
})