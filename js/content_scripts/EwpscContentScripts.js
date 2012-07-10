/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />

/// <reference path="EwpscBackground.js" />
/// <reference path="EwpscWebPage.js" />


var EwpscContentScripts = {
    addListenerForBackground: function () {
        EwpscBackground.addListenerToScroll(function (out_request, out_response) {
            EwpscWebPage.scroll(out_request.x, out_request.y);
            out_response();
        });

        EwpscBackground.addListenerToGetSizeWindow(function (out_request, out_response) {
            var sizeWindow = EwpscWebPage.getSizeWindow();

            out_response(sizeWindow);
        });

        EwpscBackground.addListenerToGetPointScrollBar(function (out_request, out_response) {
            var pointScrollBar = EwpscWebPage.getPointScrollBar();

            out_response(pointScrollBar);
        });
    }
};






var cs = {
    init: function() {
        this.addListener();
    },

    addListener: function() {
        chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
            switch (request.msg) {
                case 'getMapPage':
                    var mapPage = { sizeDocument: {}, sizeWindow: {} },
                    sizeDocument = { width: 0, height: 0 },
                    sizeWindow = { width: 0, height: 0 };

                    sizeDocument.width = $(document).width();
                    sizeDocument.height = $(document).height();
                    sizeWindow.width = $(window).width();
                    sizeWindow.height = $(window).height();

                    mapPage.sizeDocument = sizeDocument;
                    mapPage.sizeWindow = sizeWindow;

                    sendResponse(mapPage);

                    break;

                case 'setNextScrollTop':
                    var bScroll = csPage.setNextScrollTop();

                    sendResponse(bScroll);
                    break;

                case 'getPointScroll':
                    var pointScroll = { x: 0, y: 0 };

                    pointScroll.x = $('body').scrollLeft();
                    pointScroll.y = $('body').scrollTop();

                    sendResponse(pointScroll);

                    break;

                case 'setScrollTopToDocumentTop':
                    csPage.setScrollTop(0);

                    sendResponse();
                    break;
            }
        });
    }
};

var csPage = {
    setScrollTop: function(numScrollTop) {
        if (numScrollTop < 0 || numScrollTop >= $(document).height()) {
            return false;
        }

        $('body').scrollTop(numScrollTop);

        return true;
    },

    setNextScrollTop: function() {
        var nextScrollTop = this.getNextScrollTop();

        return this.setScrollTop(nextScrollTop);
    },

    getNextScrollTop: function() {
        var nextScrollTop = 0;

        nextScrollTop = $('body').scrollTop() + $(window).height();

        return nextScrollTop;
    }
};

$(document).ready(function() {
    cs.init();
});