/// <reference path="../common/EwpsImage.js" />
/// <reference path="../common/EwpsCanvas.js" />

/// <reference path="../background/EwpsbChrome.js" />



var EwpsImageAndCanvasTest = {
    getCanvasDeferred: function () {
        $.when(EwpsbChrome.captureDeferred(), EwpsbChrome.sendRequestDeferred({ requestName: 'getRectWindow' }))
        .done(function (out_strBase64Image, out_rectWindow) {
            var ewpsImage = new EwpsImage(out_rectWindow, out_strBase64Image);
            var ewpsCanvas = new EwpsCanvas(out_rectWindow.width, out_rectWindow.height);

            $.when(ewpsImage.getImageDeferred())
            .done(function (out_image) {
                ewpsCanvas.draw(out_image, 0, 0);

                var canvasWindow = ewpsCanvas.getCanvas();
                var strBase64Image = canvasWindow.toDataURL('image/png');
                var ret_ewpsImage = new EwpsImage(ewpsImage.getRect(), strBase64Image);


                $.when(ret_ewpsImage.getImageDeferred())
                .done(function (out_retImage) {
                    console.log(out_retImage);
                });
            });
        });
    }
};