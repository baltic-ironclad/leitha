'use strict';

let ip = '92.42.30.106'
let port = '7373'
let url = 'wss://' + ip + ':' + port
function sendResult(element, url) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        element['url'] = tabs[0].url
        chrome.tabs.sendMessage(tabs[0].id, {code: 'print_result', result: element});
    });

    let socket = new WebSocket(url)

    socket.onopen = function(event) {
        socket.send(JSON.stringify(element)) 
    };
    

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

        case 'selected': {
            sendResult(message.element, url)
        } break;

        // case 'cancel': {
            
        // }
    }
})