/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />

/// <reference path="EwpsbContentScripts.js" />



var EwpsbScrollBar = function () { };

EwpsbScrollBar.prototype = {
    setPointDeferred: function (in_x, in_y) {
        var dfd = $.Deferred();
        var dfdScroll = EwpsbContentScripts.scrollDeferred(in_x, in_y);

        dfdScroll.done(function () {
            setTimeout(function () {
                dfd.resolve();
            }, 10000);
            
        });

        return dfd.promise();
    },

    getPointDeferred: function () {
        var ret_dfd = $.Deferred();
        var dfdGetPointScrollBar = EwpsbContentScripts.getPointScrollBarDeferred();

        dfdGetPointScrollBar.done(function (pointScrollBar) {
            ret_dfd.resolve(pointScrollBar);
        });

        return ret_dfd.promise();
    }
};