/// <reference path="../libs/jquery-1.8.1.js" />


var PuForm = Object.create({}, {
    "strUrl": {
        get: function () {
            return $("#textUrl").val();
        },

        set: function (in_strUrl) {
            $("#textUrl").val(in_strUrl);
        }
    },

    "strStartTime": {
        get: function () {
            return $("#textStartTime").val();
        },

        set: function (in_strStartTime) {
            $("#textStartTime").val(in_strStartTime);
        }
    },

    "isValid": {
        value: function () {
            var bValid = false;
            if ($("#textUrl").val() !== "" && $("#textStartTime").val() !== "") {
                bValid = true;
            }
            return bValid;
        }
    },

    "onSubmit": {
        value: function (in_func) {
            var self = this;
            $("form").submit(function () {
                in_func(self.strUrl, self.strStartTime);
            });
        }
    }
});