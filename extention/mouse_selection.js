'use strict'

function isLeithaElement(a) {
    let els = []
    while (a) {
        els.push(a)
        a = a.parentNode
    }

    let isLeitha = false
    els.forEach(el => {
        if (el.id == 'Leitha-menu') {
            isLeitha = true
        }
    })

    return isLeitha
}

class ElementAttributes {
    constructor(el, isChild) {
        this.tag = el.tagName
        this.class = el.className
    }
}

function mouseOverOutHandler(event) {
    if (isLeithaElement(event.target)) {
        return
    }

    if (event.type == 'mouseover') {
        event.target.style.background = 'yellow'
    }
    if (event.type == 'mouseout') {
        event.target.style.background = ''
    }
}

function mouseClickHandler(event) {
    event.preventDefault()

    if (isLeithaElement(event.target)) {
        return
    }

    event.target.style.background = ''
    document.body.removeEventListener('mouseover', mouseOverOutHandler)
    document.body.removeEventListener('mouseout', mouseOverOutHandler)
    document.body.removeEventListener('click', mouseClickHandler)

    let elementAttr = new ElementAttributes(event.target)

    console.log('[mouse_selection.js]: selection ended')
    chrome.runtime.sendMessage({code: 'selected', element: elementAttr})    
}

chrome.runtime.onMessage.addListener(function(message) {
    switch (message.code) {
        case 'select': {
            console.log('[mouse_selection.js]: selection started')
            document.body.addEventListener('mouseover', mouseOverOutHandler)
            document.body.addEventListener('mouseout', mouseOverOutHandler)
            document.body.addEventListener('click', mouseClickHandler)
        } break;
    }
})


chrome.runtime.sendMessage({code: 'work'})
