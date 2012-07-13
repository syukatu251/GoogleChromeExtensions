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
        var domDocument = new EwpsbDomDocument();
        var scrollBar = new EwpsbScrollBar();
        var ret_dfd = $.Deferred();

        $.when(domWindow.getRectDeferred(), domDocument.getRectDeferred())
        .done(function (out_rectWindow, out_rectDocument) {
            var numScrollX = self._getNumScroll(in_rect.width, out_rectWindow.width);
            var numScrollY = self._getNumScroll(in_rect.height, out_rectWindow.height);
            var canvasRectangle = new EwpsCanvas(out_rectDocument.width, out_rectDocument.height);
            var xScrolled = yScrolled = i = j = preI = preJ = 0;
            var arrayDfd = new Array(numScrollY + 2);
            var funcResolveDfd = function () { };

            for (j = 0; j <= numScrollY; j++) {
                arrayDfd[j] = new Array(numScrollX + 1);
                for (i = 0; i <= numScrollX; i++) {
                    arrayDfd[j][i] = $.Deferred();
                }
            }

            preI = 0;
            preJ = numScrollY + 1;
            arrayDfd[preJ] = new Array(1);
            arrayDfd[preJ][preI] = $.Deferred();
            arrayDfd[preJ][preI].resolve();


            for (j = 0; j <= numScrollY; j++) {
                for (i = 0; i <= numScrollX; i++) {
                    $.when(i, j, arrayDfd[preJ][preI]).done(function (out_i, out_j) {
                        xScrolled = out_i * out_rectWindow.width + in_rect.x;
                        yScrolled = out_j * out_rectWindow.height + in_rect.y;
                        $.when(out_i, out_j, scrollBar.setPointDeferred(xScrolled, yScrolled)).done(function (out_i, out_j) {
                            setTimeout(function () {
                                $.when(out_i, out_j, self._captureWindowAndDrawCanvasDeferred(canvasRectangle)).done(function (out_i, out_j) {
                                    arrayDfd[out_j][out_i].resolve();
                                });
                            }, 100);
                        });
                    });

                    preI = i;
                    preJ = j;
                }
            }

            $.when(arrayDfd[numScrollY][numScrollX]).done(function () {
                ret_dfd.resolve(canvasRectangle.getCanvas(in_rect));
            });

        });

        return ret_dfd.promise();
    },

    _captureWindowAndDrawCanvasDeferred: function (io_ewpsCanvas) {
        var ret_dfd = $.Deferred();
        var domWindow = new EwpsbDomWindow();

        $.when(EwpsbChrome.captureDeferred(), domWindow.getRectDeferred())
        .done(function (out_strBase64Image, out_rectWindow) {
            var ewpsImage = new EwpsImage(out_strBase64Image, out_rectWindow);

            $.when(ewpsImage.getImageDeferred()).done(function (out_image) {
                var rectImage = ewpsImage.getRect();
                io_ewpsCanvas.draw(out_image, rectImage.x, rectImage.y);
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