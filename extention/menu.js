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

    let text = document.createElement('div')
    text.textContent = 'Select one of the elements you want to observe'
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

        case 'close_menu': {
            menu.remove()
        } break;
    }
})