/// <reference path="../libs/jquery-1.8.1.js" />

/// <reference path="PuBackground.js" />

var PuPopup = Object.create({}, {
    "initialize": {
        value: function (in_func) {
            $(function () {
                in_func();
            });
        }
    },

    "log": {
        value: function (in_message) {
            PuBackground.callFunction(function () {
                this.console.log(in_message);
            });
        }
    }
});