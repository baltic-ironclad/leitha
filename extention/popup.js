'use strict'

let chooseProduct = document.getElementById('chooseProduct');

let attributes = [{
        'name': 'Name', 
        'text': 'Please choose name of the product'
    }, {
        'name': 'Price',
        'text': 'Please choose price of the product'
    }, {
         'name': 'Image',
         'text': 'Please choose product image'
    }
]

let attrElements = []

let iter = 0

let json = []

attributes.forEach(element => {

    let attr = document.createElement('div')

    let text = document.createElement('div')
    attr.appendChild(text)
    text.textContent = element.text

    let skip = document.createElement('button')
    attr.appendChild(skip)
    skip.textContent = 'Skip'

    skip.addEventListener('click', function() {
        attr.style.display = 'none'
        if (++iter < attrElements.length) {
            attrElements[iter].style.display = 'flex'
        }
        else {
            chooseProduct.style.display = 'flex'
            alert(json)
            iter = 0
        }
    });

    attrElements.push(attr)

    attr.style.display = 'none'

    document.body.appendChild(attr)

    let mouseScript

    mouseScript = chrome.tabs.executeScript(null, {
        file: 'mouse_handlers.js'
    }, function() {
        promise.then(result => {
            json.push(result.textContent)
        })
    })

    mouseScript.then(result => {
        json.push(result.textContent)
    })
})

chooseProduct.addEventListener('click', function() {
    chooseProduct.style.display = 'none'
    attrElements[iter].style.display = 'flex'
})