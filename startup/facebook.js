let chalk = require('chalk')
let shortid = require('shortid')

app.auth.facebook = {
	login: function*(fb) {
		let email = fb.email || ''

		if(email.endsWith('googlemail.com'))
			email = email.replace('googlemail.com', 'gmail.com')

		try {
			let record = yield Promise.any([
				db.get('FacebookToUser', fb.id),
				db.get('EmailToUser', email)
			])

			let user = yield db.get('Users', record.userId)

			// Existing user
			if(user && user.accounts)
				user.accounts.facebook = fb.id

			db.set('FacebookToUser', fb.id, {
				id: fb.id,
				userId: user.id
			})

			console.log(`Existing user ${chalk.yellow(user.givenName)} ${chalk.yellow(user.familyName)} logged in`)

			return user
		} catch(_) {
			// New user
			let id = shortid.generate()
			let user = Object.assign(app.getDefaultUser(), {
				id,
				email,
				language: fb.locale || '',
				registration: (new Date()).toISOString(),
				accounts: {
					facebook: fb.id
				},
				givenName: fb.first_name || '',
				familyName: fb.last_name || '',
				gender: fb.gender || ''
			})

			console.log(user)

			db.set('FacebookToUser', fb.id, {
				id: fb.id,
				userId: user.id
			})

			db.set('EmailToUser', email, {
				id: email,
				userId: user.id
			})

			console.log(`New user logged in: ${chalk.yellow(user.givenName)} ${chalk.yellow(user.familyName)} (${user.email}) | ID ${user.id}`)

			return user
		}
	}
}