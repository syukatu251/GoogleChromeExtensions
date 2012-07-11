/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />



/// <reference path="EwpsbContentScripts.js" />
/// <reference path="EwpsbDom.js" />
/// <reference path="EwpsbDomWindow.js" />
/// <reference path="EwpsbDomDocument.js" />
/// <reference path="EwpsbScrollBar.js" />
/// <reference path="../common/EwpsImage.js" />
/// <reference path="../common/EwpsCanvas.js" />



var EwpsbWebPage = function () { };


EwpsbWebPage.prototype = {
    captureDocumentDeferred: function () {

    },

    captureRectDeferred: function (in_rect) {
        var self = this;
        var domWindow = new EwpsbDomWindow();
        var domDocument = new EwpsbDomDocument();
        var scrollBar = new EwpsbScrollBar();
        var ret_dfd = $.Deferred();

        $.when(domWindow.getRectDeferred(), domDocument.getRectDeferred())
        .done(function (out_rectWindow, out_rectDocument) {
            var numScrollX = self._getNumScroll(in_rect.width, out_rectWindow.width);
            var numScrollY = self._getNumScroll(in_rect.height, out_rectWindow.height);
            var canvasDocument = new EwpsCanvas(out_rectDocument.width, out_rectDocument.height);
            var xScrolled, yScrolled;

            for (var j = 0; j <= numScrollY; j++) {
                for (var i = 0; i <= numScrollX; i++) {
                    xScrolled = i * out_rectWindow.width + in_rect.x;
                    yScrolled = j * out_rectWindow.height + in_rect.y;

                    $.when(scrollBar.setPointDeferred(xScrolled, yScrolled))
                    .done(function () {
                        self._captureWindowAndDrawCanvas(canvasDocument);
                    });
                }
            }

            ret_dfd.resolve();
        });

        return ret_dfd.promise();
    },

    _captureWindowAndDrawCanvas: function (io_ewpsCanvas) {
        var domWindow = new EwpsbDomWindow();

        $.when(EwpsbChrome.captureDeferred(), domWindow.getRectDeferred())
        .done(function (out_strBase64Image, out_rectWindow) {
            var ewpsImage = new EwpsImage(out_rectWindow, out_strBase64Image);

            $.when(ewpsImage.getImageDeferred())
            .done(function (out_image) {
                io_ewpsCanvas.draw(out_image, out_rectWindow.x, out_rectWindow.y);
            });
        });
    },


    scrollWindowHorizontalDeferred: function () {
        var ret_dfd = $.Deferred();
        var self = this;
        var domWindow = new EwpsbDom('window');
        var domDocument = new EwpsbDom('document');

        $.when(domWindow.getRectDeferred(), domDocument.getRectDeferred())
        .done(function (out_rectWindow, out_rectDocument) {
            var dfdScrollX = self.scrollXDeferred(out_rectWindow.x + out_widthWindow);

            dfdScrollX.done(function () {
                ret_dfd.resolve();
            });
        });

        return ret_dfd.promise();
    },

    scrollWindowVerticalDeferred: function () {
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

    isWindowRightEdgeDeferred: function () {
        var ret_dfd = $.Deferred();

        $.when(domWindow.getRectDeferred(), domDocument.getRectDeferred())
        .done(function (out_rectWindow, out_rectDocument) {
            var rightWindow = out_rectWindow.x + out_rectWindow.width;

            if (rightWindow === out_rectDocument.width) {
                ret_dfd.resolve(true);
            } else {
                ret_dfd.resolve(false);
            }
        });

        return ret_dfd.promise();
    },

    isWindowBottomDeferred: function () {
        var ret_dfd = $.Deferred();

        $.when(domWindow.getRectDeferred(), domDocument.getRectDeferred())
        .done(function (out_rectWindow, out_rectDocument) {
            var bottomWindow = out_rectWindow.y + out_rectWindow.height;

            if (bottomWindow === out_rectDocument.height) {
                ret_dfd.resolve(true);
            } else {
                ret_dfd.resolve(false);
            }
        });

        return ret_dfd.promise();
    },

    _getNumScroll: function (in_length, in_lengthWindow) {
        var numScroll;

        if ((in_length % in_lengthWindow) === 0) {
            numScroll = Math.floor(in_length / in_lengthWindow) - 1;
        } else {
            numScroll = Math.floor(in_length / in_lengthWindow);
        }

        return numScroll;
    }
};