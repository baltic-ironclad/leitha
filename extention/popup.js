let getClickedElement = document.getElementById('getClickedElement');

let funcCode = "document.addEventListener('click', function(e) {    e = e || window.event;    var target = e.target || e.srcElement,        text = target.textContent || target.innerText;   console.log(text);}, false);"

getClickedElement.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: funcCode});
    });
};


