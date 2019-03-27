'use strict'

let promise = new Promise((resolve, reject) => {

    document.body.addEventListener('mouseover', mouseOverOutHandler)
    document.body.addEventListener('mouseout', mouseOverOutHandler)
    document.body.addEventListener('click', mouseClickHandler)

    function str(el) {
        if (!el) return "null"
        return el.className || el.tagName;
    }

    function mouseOverOutHandler(ev) {
        if (ev.type == 'mouseover') {
            console.log(ev.target.style)
            ev.target.style.background = 'yellow';
        }
        if (ev.type == 'mouseout') {
            ev.target.style.background = '';
        }

        let logMessage = ev.type + ': ' +
            'target=' + str(ev.target) +
            ', relatedTarget=' + str(ev.relatedTarget) + "\n";
        console.log(logMessage);
    }

    function mouseClickHandler(ev) {
        ev.target.style.background = '';
        document.body.onmouseover = document.body.onmouseout = null;

        let logMessage = ev.type + ': ' +
            'target=' + str(ev.target) +
            ', relatedTarget=' + str(ev.relatedTarget) + "\n";
        console.log(logMessage);

        resolve(ev.target)
    }
})