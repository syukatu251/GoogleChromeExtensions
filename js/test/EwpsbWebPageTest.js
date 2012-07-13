/// <reference path="../background/EwpsbWebPage.js" />


var EwpsbWebPageTest = {
    captureRectangleDeferred: function () {
        var webPage = new EwpsbWebPage();
        var domDocument = new EwpsbDomDocument();

        $.when(domDocument.getRectDeferred()).done(function (out_rect) {
            var rectTest = { x: Math.floor(out_rect.width / 4),
                y: Math.floor(out_rect.height / 4),
                width: Math.floor(out_rect.width / 4),
                height: Math.floor(out_rect.height / 4)
            };

            $.when(webPage.captureRectangleDeferred(rectTest)).done(function (out_canvas) {
                var ewpsCanvas = new EwpsCanvasWithCanvas(out_canvas);

                $.when(ewpsCanvas.getImageDeferred()).done(function (out_image) {
                    console.log(out_image);
                });
            });
        });
    },

    _getNumScroll: function () {
        var webPage = new EwpsbWebPage();
        var domDocument = new EwpsbDomDocument();
        var domWindow = new EwpsbDomWindow();

        $.when(domDocument.getRectDeferred(), domWindow.getRectDeferred())
        .done(function (out_rectDocument, out_rectWindow) {
            var numScrollY = webPage._getNumScroll(out_rectDocument.height, out_rectWindow.height);

            console.log(numScrollY);
        });
    },

    _captureWindowAndDrawCanvas: function () {
        var webPage = new EwpsbWebPage();
        var domDocument = new EwpsbDomDocument();
        var domWindow = new EwpsbDomWindow();

        $.when(domDocument.getRectDeferred(), domWindow.getRectDeferred())
        .done(function (out_rectDocument, out_rectWindow) {
            var ewpsCanvas = new EwpsCanvas(out_rectDocument.width, out_rectDocument.height);

            $.when(webPage._captureWindowAndDrawCanvasDeferred(ewpsCanvas))
            .done(function () {
                var strBase64Image = ewpsCanvas.getCanvas().toDataURL('image/png');
                var ewpsImage = new EwpsImage(out_rectDocument, strBase64Image);


                $.when(ewpsImage.getImageDeferred())
                .done(function (out_retImage) {
                    console.log(out_retImage);
                });
            });


        });
    }
};