/// <reference path="BgLocalDirectory.js" />


var BgApp = Object.create({}, {
    "initialize": {
        value: function () {
            chrome.extension.onMessage.addListener(function (request) {
                switch (request.name) {
                    case "saveImage":
                        BgLocalDirectory.saveImage(request.strTitle, request.strImageUrl);
                        break;
                    default:
                        break;
                }
            });
        }
    }
});

BgApp.initialize();