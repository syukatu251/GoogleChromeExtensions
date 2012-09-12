

var EwpspBackground = {
    captureWholePage: function () {
        var background = chrome.extension.getBackgroundPage().EwpsbBackground;
        background.captureWholePage();
    },

    appendCoverForClip: function () {
        var background = chrome.extension.getBackgroundPage().EwpsbBackground;
        background.appendCoverForClip();
    },

    removeCoverForClip: function () {
        var background = chrome.extension.getBackgroundPage().EwpsbBackground;
        background.removeCoverForClip();
    },

    captureClipRectangle: function () {
        var background = chrome.extension.getBackgroundPage().EwpsbBackground;
        background.captureClipRectangle();
    }
};