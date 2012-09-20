/// <reference path="../libs/jquery-1.8.1.js" />

/// <reference path="../common/CmTabs.js" />


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

    "removeList": {
        value: function (in_index) {
            var array = this.array;
            array.splice(in_index, 1);
            this.array = array;
        }
    }

});

var PuListCollectionView = Object.create({}, {
    "array": {
        set: function (in_array) {
            $("ul").empty();
            in_array.forEach(function (out_list) {
                var jqLi = $("<li>").text(out_list.strTitle + " : " + out_list.strStartTime);
                var jqButton = $("<button>").text("remove");
                jqLi.append(jqButton);
                $("ul").append(jqLi);
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

    "appendList": {
        value: function (in_list) {
            PuListCollectionModel.appendList(in_list);
            this.render();
        }
    },

    "clearList": {
        value: function () {
            PuListCollectionModel.array = [];
            this.render();
        }
    },

    "removeList": {
        value: function (in_index) {
            PuListCollectionModel.removeList(in_index);
            this.render();
        }
    },

    "addListener": {
        value: function () {
            var self = this;
            $("ul").on("click", "button", function () {
                self.removeList($(this).parent().index());
                $(this).parent().remove();
            });
        }
    }
});