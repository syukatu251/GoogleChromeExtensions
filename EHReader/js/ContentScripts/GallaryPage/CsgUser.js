/// <reference path="../../libs/jquery-1.8.1.js" />


var CsgUser = Object.create({}, {
    "indexStart": {
        get: function () {
            return $('#indexStart').val();
        }
    },

    "indexEnd": {
        get: function () {
            return $('#indexEnd').val();
        }
    }
});