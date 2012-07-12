/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


/// <reference path="../background/EwpsbContentScripts.js" />


/// <reference path="../background/EwpsbDomDocument.js" />
/// <reference path="../background/EwpsbDomWindow.js" />
/// <reference path="../background/EwpsbScrollBar.js" />




var EwpsbContentScriptsTest = {
    scrollDeferred: function () {
        $.when(EwpsbContentScripts.scrollDeferred(0, 0))
        .done(function () { });
    },

    getTest: function () {
//        $.when(EwpsbContentScripts.getRectDocumentDeferred(), EwpsbContentScripts.getRectWindowDeferred(), EwpsbContentScripts.getPointScrollBarDeferred())
//        .done(function (out_rectDocument, out_rectWindow, out_pointScrollBar) {
//            console.log(out_rectDocument);
//            console.log(out_rectWindow);
//            console.log(out_pointScrollBar);
//        });

        var domDocument = new EwpsbDomDocument();
        var domWindow = new EwpsbDomWindow();
        var scrollBar = new EwpsbScrollBar();

        $.when(domDocument.getRectDeferred(), domWindow.getRectDeferred(), scrollBar.getPointDeferred())
        .done(function (out_rectDocument, out_rectWindow, out_pointScrollBar) {
            console.log(out_rectDocument);
            console.log(out_rectWindow);
            console.log(out_pointScrollBar);
        });
    }
};
