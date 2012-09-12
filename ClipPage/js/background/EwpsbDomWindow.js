/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />
/// <reference path="EwpsbContentScripts.js" />

var EwpsbDomWindow = function () { };

EwpsbDomWindow.prototype = {
    getRectDeferred: function () {
        var ret_dfd = $.Deferred();
        var dfdGetRect = EwpsbContentScripts.getRectWindowDeferred();

        dfdGetRect.done(function (out_rect) {
            ret_dfd.resolve(out_rect);
        });

        return ret_dfd.promise();
    }
};