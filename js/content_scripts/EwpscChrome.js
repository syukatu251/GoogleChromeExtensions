/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


var EwpscChrome = {
    addListener: function (in_requestName, in_callback) {
        chrome.extension.onRequest.addListener(function (out_request, out_sender, out_response) {
            if (out_request.requestName === in_requestName) {
                in_callback(out_request, out_response);
            }
        });
    }
};