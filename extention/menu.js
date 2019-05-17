'use strict'

function startMenu() {
    let menu = document.createElement('div')
    document.body.appendChild(menu)
    menu.id = 'Leitha-menu'
    menu.style.position = 'fixed'
    menu.style.top = '3em'
    menu.style.right = '1.5em'
    menu.style.width = '10em'
    menu.style.height = '16em'

    menu.style.background = 'lightblue'

    let name = document.createElement('div')
    menu.appendChild(name)
    let text = document.createElement('div')
    menu.appendChild(text)

    return menu
}

let menu

// Catch messages from background.js
chrome.runtime.onMessage.addListener(function(message) {
    switch (message.code) {
        case 'start_menu': {
            menu = startMenu()
            console.log('[menu.js]: menu is created')
        } break;

        case 'set_attribute': {
            menu.firstChild.textContent = message.attribute.name
            menu.lastChild.textContent = message.attribute.text
        } break;

        case 'close_menu': {
            menu.remove()
        } break;
    }
})
