/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


/// <reference path="EwpsbChrome.js" />




var EwpsbContentScripts = {
    scrollDeferred: function (in_x, in_y) {
        return EwpsbChrome.sendRequestDeferred({ requestName: 'scroll', x: in_x, y: in_y });
    },

    getRectWindowDeferred: function () {
        return EwpsbChrome.sendRequestDeferred({ requestName: 'getRectWindow' });
    },

    getRectDocumentDeferred: function () {
        return EwpsbChrome.sendRequestDeferred({ requestName: 'getRectDocument' });
    },

    getPointScrollBarDeferred: function () {
        return EwpsbChrome.sendRequestDeferred({ requestName: 'getPointScrollBar' });
    }
};
