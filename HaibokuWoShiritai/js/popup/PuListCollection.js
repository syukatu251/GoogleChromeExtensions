/// <reference path="../libs/jquery-1.8.1.js" />

var PuListCollectionModel = Object.create({}, {
    "array": {
        get: function () {
            var background = chrome.extension.getBackgroundPage().BgApp;
            var arrayList = background.arrayList;
            
            return arrayList;
        },
        set: function (in_array) {
            var background = chrome.extension.getBackgroundPage().BgApp;
            background.arrayList = in_array;
        }
    },

    "appendList": {
        value: function (in_list) {
            var array = this.array;
            array.push(in_list);
            this.array = array;
        }
    },

    "appendListInTextField": {
        value: function () {
            if ($("#textUrl").val() !== "" && $("#textStartTime").val() !== "") {
                this.appendList({ strUrl: $("#textUrl").val(), strStartTime: $("#textStartTime").val() });
                $("#textUrl").val("");
                $("#textStartTime").val("");
            }
        }
    }

});

var PuListCollectionView = Object.create({}, {
    "array": {
        set: function (in_array) {
            $("ul").empty();
            in_array.forEach(function (out_list) {
                var secondDif = new Date(out_list.strStartTime) - Date.now();
                $("ul").append($("<li>").text(out_list.strUrl + " : " + out_list.strStartTime));
            });
        }
    }
});

var PuListCollectionController = Object.create({}, {
    "render": {
        value: function () {
            PuListCollectionView.array = PuListCollectionModel.array;
        }
    },

    "appendListInTextField": {
        value: function () {
            PuListCollectionModel.appendListInTextField();
            this.render();
        }
    },

    "clearList": {
        value: function () {
            PuListCollectionModel.array = [];
            this.render();
        }
    }
});