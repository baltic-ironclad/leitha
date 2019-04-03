'use strict'

let button = document.getElementById('chooseProduct')

button.addEventListener('click', function() {
    chrome.tabs.executeScript(null, {
        file: 'menu.js'
    })
    chrome.tabs.executeScript(null, {
        file: 'print_result.js'
    })
})