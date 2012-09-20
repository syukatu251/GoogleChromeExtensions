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
            var self = this;
            PuForm.onSubmit(function (out_strUrl, out_strStartTime) {
                if (PuForm.isValid()) {
                    PuListCollectionController.appendList({
                        strTitle: self.tab.title,
                        strUrl: out_strUrl,
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