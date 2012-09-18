/// <reference path="../libs/jquery-1.8.1.js" />

var BgBackground = Object.create({}, {
    "getUrlData": {
        value: function (in_strUrl) {
            return $.get(in_strUrl);
        }
    },

    "createTab": {
        value: function (in_strUrl) {
            chrome.tabs.create({ url: in_strUrl });
        }
    },

    "saveJsonInLocalStorage": {
        value: function (in_jsonKey, in_jsonValue) {
            localStorage[in_jsonKey] = JSON.stringify(in_jsonValue);
        }
    },

    "parseJsonFromLocalStorage": {
        value: function (in_jsonKey) {
            if (localStorage[in_jsonKey]) {
                return JSON.parse(localStorage[in_jsonKey]);
            } else {
                return null;
            }
        }
    },

    "clearLocalStorage": {
        value: function () {
            localStorage.clear();
        }
    }
});

//var dfd = BgBackground.getUrlData("http://www.alc.co.jp/");

//$.when(dfd).done(function (data) {
//    console.log($(data).find("a").first().attr("href"));
//    BgBackground.createTab($(data).find("a").first().attr("href"));
//});