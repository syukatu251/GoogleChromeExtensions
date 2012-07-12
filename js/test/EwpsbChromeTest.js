/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


/// <reference path="../background/EwpsbChrome.js" />


var EwpsbChromeTest = {
    captureDeferred: function () {
        $.when(EwpsbChrome.captureDeferred())
        .done(function (out_strBase64Image) {
            console.log(out_strBase64Image);
        });
    },

    sendRequestDeferred: function () {
        $.when(EwpsbChrome.sendRequestDeferred({requestName: 'getRectWindow'}))
        .done(function (out_rectWindow) {
            console.log(out_rectWindow);
        });
    }
};