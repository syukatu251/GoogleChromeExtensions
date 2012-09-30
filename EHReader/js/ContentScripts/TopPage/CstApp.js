/// <reference path="../../libs/jquery-1.8.1.js" />
/// <reference path="CstView.js" />
/// <reference path="CstImageData.js" />


var CstApp = Object.create({}, {
    "initialize": {
        value: function () {
            CstView.initialize();
            CstImageData.initialize();
            CstView.onClickStartButton(function () {
                CstView.jqImage = CstImageData.jq;
            });
        }
    }
});

setTimeout(function () {
    CstApp.initialize();
}, 500);