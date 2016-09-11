window.joinHangout = id => $.post('/api/hangouts/join', { id }).then(response => $.content.reload()).catch(alert)
window.leaveHangout = id => $.post('/api/hangouts/leave', { id }).then(response => $.content.reload()).catch(alert)

window.deleteHangout = function(id) {
	if(!confirm('Do you really want to delete this hangout?'))
		return;

	$.post('/api/hangouts/delete', { id })
	.then(response => $.content.reload())
	.catch(alert)
}