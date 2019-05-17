'use strict'

function isLeithaElement(a) {
    let els = []
    while (a) {
        els.push(a)
        a = a.parentNode
    }

    //console.log('[mouse_selection.js]:', els)

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
        this.id = el.id
        this.isChild = isChild
        if (isChild) {
            this.parent = new ElementAttributes(el.parentNode, false)
        }
        else {
            this.parent = null
        }

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

    let elementAttr = new ElementAttributes(event.target, true)

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