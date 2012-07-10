/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />

/// <reference path="EwpsbContentScripts.js" />



var EwpsbScrollBar = function () { };

EwpsbScrollBar.prototype = {
    setPointDeferred: function (in_x, in_y) {
        var dfd = $.Deferred();
        var dfdScroll = EwpsbContentScripts.scrollDeferred(in_x, in_y);

        dfdScroll.done(function () {
            dfd.resolve();
        });

        return dfd.promise();
    },

    setXDeferred: function (in_x) {
        var self = this;
        var y;
        var ret_dfd;
        var dfdGetY = this.getYDeferred();

        dfdGetY.done(function (out_y) {
            y = out_y;
        }).done(function () {
            ret_dfd = self.setPoint(in_x, y);
        });

        return ret_dfd;
    },

    setYDeferred: function (in_y) {
        var self = this;
        var x;
        var ret_dfd;
        var dfdGetX = this.getXDeferred();

        dfdGetScrollX.done(function (out_x) {
            x = out_x;
        }).done(function () {
            ret_dfd = self.setPoint(x, in_y);
        });

        return ret_dfd;
    },

    getPointDeferred: function () {
        var ret_dfd = $.Deferred();
        var dfdGetPointScrollBar = EwpsbContentScripts.getPointScrollBarDeferred();

        dfdGetPointScrollBar.done(function (pointScrollBar) {
            ret_dfd.resolve(pointScrollBar);
        });

        return ret_dfd.promise();
    },

    getXDeferred: function () {
        var ret_dfd = $.Deferred();
        var dfdGetPoint = this.getPointDeferred();

        dfdGetPoint.done(function (pointScrollBar) {
            ret_dfd.resolve(pointScrollBar.x);
        });

        return ret_dfd.promise();
    },

    getYDeferred: function () {
        var ret_dfd = $.Deferred();
        var dfdGetPoint = this.getPointDeferred();

        dfdGetPoint.done(function (pointScrollBar) {
            ret_dfd.resolve(pointScrollBar.y);
        });

        return ret_dfd.promise();
    }
};