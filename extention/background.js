'use strict';

let product = {name: '', price: '', image_url: ''}

let attributes = [{
    name: 'name', 
    text: 'Please select name of the product'
}, {
    name: 'price',
    text: 'Please select price of the product'
} //, {
//      'name': 'Image',
//      'text': 'Please select product image'
// }
]

let iter = 0

chrome.runtime.onMessage.addListener(function(message) {
    switch (message.code) {
        case 'run_script': {
            iter = 0

            chrome.tabs.executeScript(null, {
                file: 'mouse_selection.js'
            })
        } break;

        case 'start': {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                let attribute = attributes[iter]
                chrome.tabs.sendMessage(tabs[0].id, {code: 'set_attribute', attribute: attribute});
                chrome.tabs.sendMessage(tabs[0].id, {code: 'select'});
            })
        } break;

        case 'selected': { 
            product[iter] = message.element
            ++iter
            if (iter < attributes.length) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    let attribute = attributes[iter]
                    chrome.tabs.sendMessage(tabs[0].id, {code: 'set_attribute', attribute: attribute});
                    chrome.tabs.sendMessage(tabs[0].id, {code: 'select'});
                });
            }
            else {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {code: 'close_menu'});
                    chrome.tabs.sendMessage(tabs[0].id, {code: 'print_result', result: product});
                });
            }
        } break;
    }
})