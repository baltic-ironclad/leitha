'use strict'

let button = document.getElementById('selectProduct')

let isStarted = false

button.addEventListener('click', function() {
	chrome.runtime.sendMessage({code: 'run_selection'})

	button.style.display = 'none'

    let text = document.createElement('div')
    text.textContent = 'Select one of the elements you want to observe'
    document.body.appendChild(text)
})