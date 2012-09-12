/// <reference path="../libs/jquery-1.8.1.js" />


var BgContentScript = Object.create({}, {
    "callFunction": {
        value: function (in_func) {
            var dfd = $.Deferred();
            chrome.tabs.getSelected(null, function (tab) {
                chrome.tabs.sendMessage(tab.id, { name: "callFunction", calledFunction: in_func }, function (out_response) {
                    dfd.resolve(out_response);
                });
            });
            return dfd.promise();
        }
    }
});

var dfd = BgContentScript.callFunction(function () {
    return $(this.document)
});

$.when(dfd).done(function (out_jqDocument) {
    console.log(out_jqDocument.width);
});