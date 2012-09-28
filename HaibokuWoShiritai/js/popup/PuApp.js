/// <reference path="../libs/jquery-1.8.1.js" />
/// <reference path="../common/CmDate.js" />
/// <reference path="../common/CmTabs.js" />

/// <reference path="PuForm.js" />
/// <reference path="PuListCollection.js" />



var PuAppController = Object.create({}, {
    "onReady": {
        value: function () {
            var self = this;
            $(function () {
                self.render();
                self.addListener();
   
                PuForm.strUrl = self.tab.url;
                PuForm.strStartTime = CmDate.strNow;

                var bgNicoNama = chrome.extension.getBackgroundPage().CmNicoNama;

                $.when(bgNicoNama.getDfdDate(self.tab.url)).done(function (out_date) {
                    PuForm.strStartTime = CmDate.toStr(out_date);
                });

            });
        }
    },

    "render": {
        value: function () {
            $("#pTitle").text(this.tab.title);
            PuListCollectionController.render();
        }
    },

    "addListener": {
        value: function () {
            var self = this;
            PuForm.onSubmit(function (out_strStartTime) {
                if (PuForm.isValid()) {
                    PuListCollectionController.appendList({
                        strTitle: self.tab.title,
                        strUrl: self.tab.url,
                        strStartTime: out_strStartTime
                    });
                }
            });

            $("#buttonClearList").click(function () {
                PuListCollectionController.clearList();
            });

            PuListCollectionController.addListener();
        }
    },

    "tab": {
        value: null,
        writable: true
    }
});


$.when(CmTabs.dfdActiveTab).done(function (out_tab) {
    PuAppController.tab = out_tab;
    PuAppController.onReady();
});