'use strict'

function str(el) {
    if (!el) return "null"
    return el.className || el.tagName;
}

function mouseOverOutHandler(ev) {
    if (ev.type == 'mouseover') {
        ev.target.style.background = 'yellow';
    }
    if (ev.type == 'mouseout') {
        ev.target.style.background = '';
    }
    // let logMessage = ev.type + ': ' +
    //     'target=' + str(ev.target) +
    //     ', relatedTarget=' + str(ev.relatedTarget) + "\n";
    // console.log(logMessage);
}

function mouseClickHandler(ev) {
    ev.target.style.background = '';
    document.body.removeEventListener('mouseover', mouseOverOutHandler)
    document.body.removeEventListener('mouseout', mouseOverOutHandler)
    document.body.removeEventListener('click', mouseClickHandler)

    // let logMessage = ev.type + ': ' +
    //     'target=' + str(ev.target) +
    //     ', relatedTarget=' + str(ev.relatedTarget) + "\n";
    // console.log(logMessage);

    console.log('[mouse_selection.js] SELECTION ENDED')
    chrome.runtime.sendMessage({code: 'selected', element: ev.target})    
}

chrome.runtime.onMessage.addListener(function(message) {
    switch (message.code) {
        case 'select': {
            console.log('[mouse_selection.js] SELECTION STARTED')
            document.body.addEventListener('mouseover', mouseOverOutHandler)
            document.body.addEventListener('mouseout', mouseOverOutHandler)
            document.body.addEventListener('click', mouseClickHandler)
        } break;
    }
})

chrome.runtime.sendMessage({code: 'start'})