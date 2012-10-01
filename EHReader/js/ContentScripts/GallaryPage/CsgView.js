/// <reference path="../../libs/jquery-1.8.1.js" />


var CsgView = Object.create({}, {
    "initialize": {
        value: function () {
            $('div.csButtonDiv').append($("<button>").attr("id", "csSaveButton").text("save"));
        }
    },
    "appendImage": {
        value: function (in_jqImage) {
            $("div.csImageViewDiv").append(in_jqImage);
        }
    },

    "removeImage": {
        value: function () {
            $("div.csImageViewDiv").empty();
        }
    },

    "onClickSaveButton": {
        value: function (in_func) {
            $('#csSaveButton').click(function () {
                in_func();
            });
        }
    }
});