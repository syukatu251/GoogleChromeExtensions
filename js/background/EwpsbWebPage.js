/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />



/// <reference path="EwpsbContentScripts.js" />
/// <reference path="EwpsbDom.js" />
/// <reference path="EwpsbScrollBar.js" />



var EwpsbWebPage = function () { };


EwpsbWebPage.prototype = {
    captureWindowDeferred: function () {
        return EwpsbChrome.captureDeferred();
    },

    captureDocumentDeferred: function () { },

    scrollDeferred: function (in_x, in_y) {
        var scrollBar = new EwpsbScrollBar();

        return scrollBar.setPointDeferred(in_x, in_y);
    },

    scrollXDeferred: function (in_x) {
        var scrollBar = new EwpsbScrollBar();

        return scrollBar.setXDeferred(in_x);
    },

    scrollYDeferred: function (in_y) {
        var scrollBar = new EwpsbScrollBar();

        return scrollBar.setYDeferred(in_y);
    },

    scrollHorizontalWindowDeferred: function () {
        var ret_dfd = $.Deferred();
        var self = this;

        $.when(this.getWidthWindowDeferred(),
               this.getWidthDocumentDeferred(),
               this.getXScrollDeferred())
        .done(function (out_widthWindow, out_widthDocument, out_xScroll) {
            var dfdScrollX = self.scrollXDeferred(out_xScroll + out_widthWindow);

            dfdScrollX.done(function () {
                ret_dfd.resolve();
            });
        });

        return ret_dfd.promise();
    },

    scrollVerticalWindowDeferred: function () {
        var ret_dfd = $.Deferred();
        var self = this;

        $.when(this.getHeightWindowDeferred(),
               this.getHeightDocumentDeferred(),
               this.getYScrollDeferred())
        .done(function (out_heightWindow, out_heightDocument, out_yScroll) {
            var dfdScrollY = self.scrollYDeferred(out_yScroll + out_heightWindow);

            dfdScrollX.done(function () {
                ret_dfd.resolve();
            });
        });

        return ret_dfd.promise();
    },

    getPointScrollDeferred: function () {
        var scrollBar = new EwpsbScrollBar();

        return scrollBar.getPointDeferred();
    },

    getXScrollDeferred: function () {
        var scrollBar = new EwpsbScrollBar();

        return scrollBar.getXDeferred();
    },

    getYScrollDeferred: function () {
        var scrollBar = new EwpsbScrollBar();

        return scrollBar.getYDeferred();
    },

    getSizeWindowDeferred: function () {
        var domWindow = new EwpsbDom('window');

        return domWindow.getSizeDeferred();
    },

    getWidthWindowDeferred: function () {
        var domWindow = new EwpsbDom('window');

        return domWindow.getWidthDeferred();
    },

    getHeightWindowDeferred: function () {
        var domWindow = new EwpsbDom('window');

        return domWindow.getHeightDeferred();
    },

    getSizeDocumentDeferred: function () {
        var domDocument = new EwpsbDom('document');

        return domDocument.getSizeDeferred();
    },

    getWidthDocumentDeferred: function () {
        var domDocument = new EwpsbDom('document');

        return domDocument.getWidthDeferred();
    },

    getHeightDocumentDeferred: function () {
        var domDocument = new EwpsbDom('document');

        return domDocument.getHeightDeferred();
    },

    isRightEdgeDeferred: function () { 
        
    }
};