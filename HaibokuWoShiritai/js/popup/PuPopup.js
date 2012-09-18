/// <reference path="../libs/jquery-1.8.1.js" />

var PuPopup = Object.create({}, {
    "initialize": {
        value: function () {
            var self = this;
            var background = chrome.extension.getBackgroundPage().BgBackground;
            var jsonFromLocalStorage = background.parseJsonFromLocalStorage("arrayListString");
            var arrayListString = [];

            if (jsonFromLocalStorage) {
                arrayListString = jsonFromLocalStorage.arrayListString;
                arrayListString.forEach(function (out_strList) {
                    $("ul").append($("<li>").text(out_strList))
                });
            }
            

            $("form").submit(function () {
                arrayListString.push($("input").val());
                background.saveJsonInLocalStorage("arrayListString", { arrayListString: arrayListString });
            });

            $("button").click(function () {
                self.clearList();
            });

            $("input").focus();
        }
    },

    "clearList": {
        value: function () {
            var background = chrome.extension.getBackgroundPage().BgBackground;
            background.clearLocalStorage();
            $("ul").empty();
        }
    }
});

$(function () {
    PuPopup.initialize();
});