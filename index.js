global.app = require('aero')()
let bodyParser = require('body-parser')

app.apiKeys = require('./security/api-keys.json')

app.on('database ready', db => {
	global.db = db
})

app.use(bodyParser.json())

app.run()