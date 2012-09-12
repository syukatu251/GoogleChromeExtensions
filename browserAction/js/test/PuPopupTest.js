/// <reference path="PuPopup.js" />
/// <reference path="../popup/PuBackground.js" />


var PuPopupTest = Object.create(PuPopup, {
    "initialize": {
        value: function () {
            var self = this;
            Object.getPrototypeOf(this).initialize(function () {
                $("#idButtonJavaScriptTest").click(function () {
                    PuBackground.callFunction(function () {

                    });
                });
            });
        }
    }
});


PuPopupTest.initialize();