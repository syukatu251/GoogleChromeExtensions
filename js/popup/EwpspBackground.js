

var EwpspBackground = {
    captureWholePage: function () {
        var background = chrome.extension.getBackgroundPage().EwpsbBackground;
        background.captureWholePage();
    }
};