/// <reference path="../../libs/jquery-1.8.1.js" />


var CsgView = Object.create({}, {
    "initialize": {
        value: function () {
            var jqP = $('<p>');
            jqP.append($("<button>").attr("id", "csSaveButton").text("save"));
            jqP.append($('<input type="text">').attr('id', 'indexStart').width(20));
            jqP.append($('<input type="text">').attr('id', 'indexEnd').width(20));
            $('div.csButtonDiv').append(jqP);

            var jqPLog = $('<p>').attr('id', 'csLog');
            $('div.csButtonDiv').append(jqPLog);
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