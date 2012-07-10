/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


/// <reference path="EwpsbChrome.js" />




var EwpsbContentScripts = {
    scrollDeferred: function (in_x, in_y) {
        return EwpsbChrome.sendRequestDeferred({ requestName: 'scroll', x: in_x, y: in_y });
    },

    getSizeWindowDeferred: function () {
        return EwpsbChrome.sendRequestDeferred({ requestName: 'getSizeWindow' });
    },

    getSizeDocumentDeferred: function () {
        return EwpsbChrome.sendRequestDeferred({ requestName: 'getSizeDocument' });
    },

    getPointScrollBarDeferred: function () {
        return EwpsbChrome.sendRequestDeferred({ requestName: 'getPointScrollBar' });
    }
};



var bgContentScripts = {};

bgContentScripts.request = {
    send: function(mapRequest, callback) {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendRequest(tab.id, mapRequest, callback);
        });
    },

    getMapPage: function(callback) {
        this.send({ msg: 'getMapPage' }, callback);
    },

    getPointScroll: function(callback) {
        this.send({ msg: 'getPointScroll' }, callback);
    },

    setNextScrollTop: function(callback) {
        this.send({ msg: 'setNextScrollTop' }, callback);
    },

    setScrollTopToDocumentTop: function(callback) {
        this.send({ msg: 'setScrollTopToDocumentTop' }, callback);
    }
};

bgContentScripts.page = {
    sizeDocument: { width: 0, height: 0 },
    sizeWindow: { width: 0, height: 0 },

    init: function(callback) {
        var self = this;

        bgContentScripts.request.getMapPage(function(mapPage) {
            self.sizeDocument = mapPage.sizeDocument;
            self.sizeWindow = mapPage.sizeWindow;

            self.scrollDocumentTop(function() {
                callback();
            });
        });
    },

    captureAndScroll: function(callback) {
        var self = this;

        this.capture(function(srcImage) {
            self.getPointScroll(function(pointScroll) {
                bgContentScripts.canvas.draw(srcImage, self.sizeWindow, pointScroll, function() {
                    self.scrollNextTop(function(bScroll) {
                        if (bScroll) {
                            self.captureAndScroll(callback);
                        } else {
                            callback();
                        }
                    });
                });
            });
        });
    },

    captureWholePage: function(callback) {
        this.captureAndScroll(function() {
            callback();
        });
    },

    getSizeDocument: function() {
        return this.sizeDocument;
    },

    capture: function(callback) {
        // setTimeoutを入れないとcaptureがうまくいかない
        setTimeout(function() {
            chrome.tabs.captureVisibleTab({format: 'png'}, function(srcImage) {
                callback(srcImage);
            });
        }, 100);
    },

    scrollNextTop: function(callback) {
        bgContentScripts.request.setNextScrollTop(function(bScroll) {
            callback(bScroll);
        });
    },

    scrollDocumentTop: function(callback) {
        bgContentScripts.request.setScrollTopToDocumentTop(function() {
            callback();
        });
    },

    getPointScroll: function(callback) {
        bgContentScripts.request.getPointScroll(function(pointScroll) {
            callback(pointScroll);
        });
    }
};

bgContentScripts.canvas = {
    init: function(sizeCanvas) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = sizeCanvas.width;
        this.canvas.height = sizeCanvas.height;
    },

    draw: function(srcImage, srcSize, desPoint, callback) {
        var context = this.canvas.getContext('2d'),
        $image = $('<img />');

        $image.load(function() {
            context.drawImage($image.get()[0], 0, 0, srcSize.width, srcSize.height, desPoint.x, desPoint.y, srcSize.width, srcSize.height);

            callback();
        });

        $image.attr('src', srcImage);
    },

    getSrcImage: function() {
        return this.canvas.toDataURL('image/png');
    }
};