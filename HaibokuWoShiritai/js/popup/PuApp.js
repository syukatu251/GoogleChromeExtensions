/// <reference path="../libs/jquery-1.8.1.js" />
/// <reference path="../common/CmDate.js" />
/// <reference path="PuListCollection.js" />

var PuAppModel = Object.create({}, {
    "dfdTab": {
        get: function () {
            var self = this;
            var dfd = $.Deferred();

            chrome.tabs.getCurrent(function (tab) {
                dfd.resolve(tab);
            });

            return dfd.promise();
        }
    }
});


var PuAppController = Object.create({}, {
    "onReady": {
        value: function () {
            var self = this;
            $(function () {
                self.render();
                self.addListener();
                $.when(PuAppModel.dfdTab).done(function (out_tab) {
                    alert(out_tab.url);
                    $("#textUrl").val(out_tab.url);
                });
                $("#textStartTime").val(CmDate.strNow);
            });
        }
    },

    "render": {
        value: function () {
            PuListCollectionController.render();
        }
    },

    "addListener": {
        value: function () {
            $("form").submit(function () {
                PuListCollectionController.appendListInTextField();
            });

            $("button").click(function () {
                PuListCollectionController.clearList();
            });
        }
    }
});

PuAppController.onReady();