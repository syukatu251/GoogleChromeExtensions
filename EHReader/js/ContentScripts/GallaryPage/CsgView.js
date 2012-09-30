/// <reference path="../../libs/jquery-1.8.1.js" />


var CsgView = Object.create({}, {
    "appendImage": {
        value: function (in_jqImage) {
            $("div.csImageViewDiv").append(in_jqImage);
        }
    },

    "removeImage": {
        value: function () {
            $("div.csImageViewDiv").empty();
        }
    }
});