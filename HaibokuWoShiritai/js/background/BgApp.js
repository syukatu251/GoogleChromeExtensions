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

            this.arrayList.forEach(function (out_list, out_index) {
                var secondDif = new Date(out_list.strStartTime) - Date.now();
                var timerId = setTimeout(function () {
                    self.createTab(out_list.strUrl);

                    var array = self.arrayList;
                    array.splice(out_index, 1);
                    self.arrayList = array;

                }, secondDif + 1000);

                self.arrayTimerId.push(timerId);
            });
        }
    }
});

BgApp.setTimeout();