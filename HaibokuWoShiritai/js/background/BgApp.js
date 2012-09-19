/// <reference path="../libs/jquery-1.8.1.js" />

var BgApp = Object.create({}, {
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

    "arrayList": {
        get: function () {
            var strJson = localStorage["ListCollection"];
            var arrayList = [];
            if (strJson) {
                arrayList = JSON.parse(strJson).array;
            }
            return arrayList;
        },
        set: function (in_arrayList) {
            var strJson = JSON.stringify({ array: in_arrayList });
            localStorage["ListCollection"] = strJson;

            this.setTimeout();
        }
    },

    "arrayTimerId": {
        value: [],
        writable: true
    },

    "setTimeout": {
        value: function () {
            var self = this;

            this.arrayTimerId.forEach(function (out_timerId) {
                clearTimeout(out_timerId);
            });

            this.arrayTimerId = [];

            this.arrayList.forEach(function (out_list) {
                var secondDif = new Date(out_list.strStartTime) - Date.now();
                var timerId = setTimeout(function () {
                    self.createTab(out_list.strUrl);
                }, secondDif);

                this.arrayTimerId.push(timerId);
            });
        }
    }
});

BgApp.setTimeout();

//var dfd = BgApp.getUrlData("http://www.alc.co.jp/");

//$.when(dfd).done(function (data) {
//    console.log($(data).find("a").first().attr("href"));
//    BgApp.createTab($(data).find("a").first().attr("href"));
//});
