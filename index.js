let app = require('aero')()

app.apiKeys = require('./security/api-keys.json')

app.on('database ready', db => {
	global.db = db
})

app.run()