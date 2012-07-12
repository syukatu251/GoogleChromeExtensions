/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />



/// <reference path="EwpsbContentScripts.js" />
/// <reference path="EwpsbDomWindow.js" />
/// <reference path="EwpsbDomDocument.js" />
/// <reference path="EwpsbScrollBar.js" />
/// <reference path="../common/EwpsImage.js" />
/// <reference path="../common/EwpsCanvas.js" />



var EwpsbWebPage = function () { };


EwpsbWebPage.prototype = {
    captureDocumentDeferred: function () {
        var self = this;
        var ret_dfd = $.Deferred();
        var domDocument = new EwpsbDomDocument();

        $.when(domDocument.getRectDeferred())
        .done(function (out_rectDocument) {
            $.when(self.captureRectangleDeferred(out_rectDocument))
            .done(function (out_canvas) {
                ret_dfd.resolve(out_canvas);
            });
        });

        return ret_dfd.promise();
    },

    captureRectangleDeferred: function (in_rect) {
        var self = this;
        var domWindow = new EwpsbDomWindow();
        var scrollBar = new EwpsbScrollBar();
        var ret_dfd = $.Deferred();

        $.when(domWindow.getRectDeferred())
        .done(function (out_rectWindow) {
            var numScrollX = self._getNumScroll(in_rect.width, out_rectWindow.width);
            var numScrollY = self._getNumScroll(in_rect.height, out_rectWindow.height);
            var canvasRectangle = new EwpsCanvas(in_rect.width, in_rect.height);
            var xScrolled, yScrolled;
            var dfdDrawCanvas;

            for (var j = 0; j <= numScrollY; j++) {
                for (var i = 0; i <= numScrollX; i++) {
                    xScrolled = i * out_rectWindow.width + in_rect.x;
                    yScrolled = j * out_rectWindow.height + in_rect.y;

                    $.when(scrollBar.setPointDeferred(xScrolled, yScrolled))
                    .done(function () {
                        dfdDrawCanvas = self._captureWindowAndDrawCanvasDeferred(canvasRectangle);
                        if (i > numScrollX && j > numScrollY) {
                            dfdDrawCanvas.done(function () {
                                ret_dfd.resolve(canvasRectangle.getCanvas());
                            });
                        }
                    });
                }
            }
        });

        return ret_dfd.promise();
    },

    _captureWindowAndDrawCanvasDeferred: function (io_ewpsCanvas) {
        var ret_dfd = $.Deferred();
        var domWindow = new EwpsbDomWindow();

        $.when(EwpsbChrome.captureDeferred(), domWindow.getRectDeferred())
        .done(function (out_strBase64Image, out_rectWindow) {
            var ewpsImage = new EwpsImage(out_rectWindow, out_strBase64Image);

            $.when(ewpsImage.getImageDeferred())
            .done(function (out_image) {
                io_ewpsCanvas.draw(out_image, out_rectWindow.x, out_rectWindow.y);
                ret_dfd.resolve();
            });
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