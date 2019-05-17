'use strict';

function sendResult(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        element['url'] = tabs[0].url
        chrome.tabs.sendMessage(tabs[0].id, {code: 'print_result', result: element});
    });
}


var id
var isStarted = []
var promise

chrome.runtime.onMessage.addListener(function(message) {
    switch (message.code) {
        case 'run_selection': {
            promise = chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                id = tabs[0].id
                let flag = isStarted.some(tabId => {
                    return id == tabId
                })
                if (!flag) {
                    chrome.tabs.executeScript({file: 'print_result.js'})
                    chrome.tabs.executeScript({file: 'mouse_selection.js'})
                    isStarted.push(id)
                }
                else {
                    console.log('cannot open, id:', id)
                }

                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {code: 'select'})
                });
            });

        } break;

        case 'work': {
            console.log('it works')
        } break;

        case 'selected': {
            sendResult(message.element)
        } break;
    }
})