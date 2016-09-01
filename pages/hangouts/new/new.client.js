window.publishHangout = function() {
	let message = $('message').value
	let game = $('game').value
	let date = $('date').value
	let time = $('time').value

	$.post('/api/hangouts/new', {
		message,
		game,
		date,
		time
	}).then(response => location.href = '/').catch(alert)
}