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

app.run()