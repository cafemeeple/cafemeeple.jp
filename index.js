let app = require('aero')()

app.apiKeys = require('./security/api-keys.json')

app.on('database ready', db => {
	console.log('Connected to database')
	global.db = db
})

app.run()