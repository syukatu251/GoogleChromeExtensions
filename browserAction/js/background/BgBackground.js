/// <reference path="BgContentScript.js" />


var BgBackground = Object.create({}, {
    "callFunction": {
        value: function (in_function) {
            return in_function();
        }
    },
    "contentScript": {
        get: function () {
            return BgContentScript;
        }
    }
});