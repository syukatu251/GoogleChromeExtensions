/// <reference path="EwpsbWebPage.js" />
/// <reference path="EwpsbPlugin.js" />



var EwpsbBackground = {
    captureWholePage: function () {
        var self = this;
        var webPage = new EwpsbWebPage();

        $.when(webPage.captureDocumentDeferred(), webPage.getTitleDeferred(), webPage.getUrlDeferred())
        .done(function (out_canvas, out_title, out_url) {
            EwpsbPlugin.saveWp(out_title, out_url, out_canvas.toDataURL('image/png'));
        });
    },

    appendCoverForClip: function () {
        var webPage = new EwpsbWebPage();

        $.when(webPage.addClipRectangleDeferred()).done(function () { });
    },

    removeCoverForClip: function () {
        var webPage = new EwpsbWebPage();

        $.when(webPage.removeClipRectangleDeferred()).done(function () { });
    },

    captureClipRectangle: function () {
        var webPage = new EwpsbWebPage();

        $.when(webPage.captureClipRectangleDeferred(), webPage.getTitleDeferred(), webPage.getUrlDeferred(), webPage.getWidthWindowDeferred())
        .done(function (out_canvas, out_title, out_url, out_widthWindow) {
            EwpsbPlugin.saveClip(out_title, out_url, out_canvas.toDataURL('image/png'), out_widthWindow);
        });
    }
};
