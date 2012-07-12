/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />

/// <reference path="EwpscBackground.js" />
/// <reference path="EwpscWebPage.js" />


var EwpscContentScripts = {
    addListenerForBackground: function () {
        EwpscBackground.addListenerToScroll(function (out_request, out_response) {
            EwpscWebPage.scroll(out_request.x, out_request.y);
            out_response();
        });

        EwpscBackground.addListenerToGetRectWindow(function (out_request, out_response) {
            var rectWindow = EwpscWebPage.getRectWindow();

            out_response(rectWindow);
        });

        EwpscBackground.addListenerToGetRectDocument(function (out_request, out_response) {
            var rectDocument = EwpscWebPage.getRectDocument();

            out_response(rectDocument);
        });


        EwpscBackground.addListenerToGetPointScrollBar(function (out_request, out_response) {
            var pointScrollBar = EwpscWebPage.getPointScrollBar();

            out_response(pointScrollBar);
        });
    }
};


EwpscContentScripts.addListenerForBackground();
