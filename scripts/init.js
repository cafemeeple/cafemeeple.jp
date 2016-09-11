document.addEventListener('DOMContentLoaded', function(event) {
	let title = $('title')
	if(title)
		title.style['transform'] = 'rotateX(0)'
}, { once: true })