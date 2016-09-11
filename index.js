global.app = require('aero')()
let bodyParser = require('body-parser')

app.on('database ready', db => {
	global.db = db
})

app.getDefaultUser = function() {
	return {
		email: '',
		language: '',
		accounts: {},
		givenName: '',
		familyName: '',
		gender: ''
	}
}

app.use(bodyParser.json())

app.HangoutController = function(next) {
	next = Promise.coroutine(next)

	return Promise.coroutine(function*(request, response) {
		let user = request.user
		let id = request.body.id

		if(!user) {
			response.writeHead(400)
			return response.end('Not logged in')
		}

		if(!id) {
			response.writeHead(400)
			return response.end('Undefined id')
		}

		yield next(user, id)

		response.end()
	})
}

app.run()