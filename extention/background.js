'use strict';

function nameByCode(n) {
    switch (n) {
        case 0: return 'name'
        case 1: return 'price'
    }
}

function sendResult() {
    
}

let product = {name: '', price: '', image_url: ''}

let attributes = [{
    name: 'name', 
    text: 'Please select name of the product'
}//, {s
    // name: 'price',
    // text: 'Please select price of the product'
//}, {
//      'name': 'Image',
//      'text': 'Please select product image'
// }
]

let counter = 0

chrome.runtime.onMessage.addListener(function(message) {
    switch (message.code) {
        case 'run_selection': {
            counter = 0

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {code: 'start_menu'})
                chrome.tabs.sendMessage(tabs[0].id, {code: 'set_attribute', attribute: attributes[counter]})
                chrome.tabs.sendMessage(tabs[0].id, {code: 'select'})
            })
        } break;

        case 'selected': { 
            switch (counter) {
                case 0:  {
                    product.name = message.element
                }
                case 1:  {
                    product.price = message.element
                }
            }

            ++counter
            if (counter < attributes.length) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    let attribute = attributes[counter]
                    chrome.tabs.sendMessage(tabs[0].id, {code: 'set_attribute', attribute: attributes[counter]});
                    chrome.tabs.sendMessage(tabs[0].id, {code: 'select'});
                });
            }
            else { // All attributes have been selected
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {code: 'close_menu'});
                    chrome.tabs.sendMessage(tabs[0].id, {code: 'print_result', result: product});
                });
            }
        } break;
    }
})