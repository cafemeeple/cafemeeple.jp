exports.post = app.HangoutController(function*(user, id) {
	let hangout = yield db.get('Hangouts', id)
	let index = hangout.members.indexOf(user.id)

	if(index !== -1)
		hangout.members.splice(index, 1)

	yield db.set('Hangouts', id, hangout)
})