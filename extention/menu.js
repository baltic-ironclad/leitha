'use strict'

let menu = document.createElement('div')
document.body.appendChild(menu)
menu.id = 'Leitha-menu'
menu.style.position = 'fixed'
menu.style.top = '3em'
menu.style.right = '1.5em'
menu.style.width = '5em'
menu.style.height = '8em'

let name = document.createElement('div')
menu.appendChild(name)
let text = document.createElement('div')
menu.appendChild(text)

chrome.runtime.onMessage.addListener(function(message) {
    switch (message.code) {
        case 'set_attribute': {
            console.log('[menu.js]:', message.attribute)
            name.textContent = message.attribute.name
            text.textContent = message.attribute.text
        } break;

        case 'close_menu': {
            menu.remove()
        } break;
    }
})

chrome.runtime.sendMessage({code: 'run_script'})