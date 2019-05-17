'use strict'

let button = document.getElementById('chooseProduct')

let isStarted = false

button.addEventListener('click', function() {
	if (!isStarted) {
	    chrome.tabs.executeScript(null, {
	        file: 'menu.js'
	    })
	    chrome.tabs.executeScript(null, {
	        file: 'print_result.js'
	    })
	    chrome.tabs.executeScript(null, {
            file: 'mouse_selection.js'
        })
	    isStarted = true
	}

	chrome.runtime.sendMessage({code: 'run_selection'})
})