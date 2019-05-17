'use strict'

let button = document.getElementById('selectProduct')

button.addEventListener('click', function() {
	chrome.runtime.sendMessage({code: 'run_selection'})

	button.style.display = 'none'

    let text = document.createElement('div')
    text.textContent = 'Select one of the elements you want to observe'
    document.body.appendChild(text)

  //   let cancel = document.createElement('button')
  //   cancel.textContent = 'Cancel'
  //   cancel.addEventListener('click', function(event) {
		// chrome.runtime.sendMessage({code: 'cancel'})
		// button.style.display = 'block'
		// text.remove()
  //   })
})