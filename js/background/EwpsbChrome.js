/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


var EwpsbChrome = {
    captureDeferred: function () {
        var ret_dfd = $.Deferred();

        chrome.tabs.captureVisibleTab({ format: 'png' }, function (srcImage) {
            ret_dfd.resolve(srcImage);
        });

        return ret_dfd.promise();
    },

    sendRequestDeferred: function (request) {
        var ret_dfd = $.Deferred();

        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, request, function (out_response) {
                ret_dfd.resolve(out_response);
            });
        });

        return ret_dfd.promise();
    }
};