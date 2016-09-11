exports.post = app.HangoutController(function*(user, id) {
	yield db.remove('Hangouts', id)
})