'use strict'

chrome.runtime.onMessage.addListener(function(message) {
    switch (message.code) {
        case 'print_result': {
            console.log('[print_result.js]', message.result)
        } break;
    }
})