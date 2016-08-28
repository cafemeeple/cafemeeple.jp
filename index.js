let app = require('aero')()

app.on('database ready', db => {
	console.log('Connected to database')
	global.db = db
})

app.run()