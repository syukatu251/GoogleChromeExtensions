var CsBackground = Object.create({}, {
    "addListener": {
        value: function () {
            chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
                var response = request.calledFunction();
                sendResponse(response);
            });
        }
    }
});

CsBackground.addListener();