/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />
/// <reference path="EwpsImage.js" />


var EwpsCanvas = function (in_width, in_height) {
    this._canvas = document.createElement("canvas");
    this._canvas.width = in_width;
    this._canvas.height = in_height;
};

var EwpsCanvasWithCanvas = function (in_canvas) {
    this._canvas = in_canvas;
}

EwpsCanvas.prototype = EwpsCanvasWithCanvas.prototype = {
    draw: function (in_image, in_xImage, in_yImage) {
        var context = this._canvas.getContext('2d');

        context.drawImage(in_image, in_xImage, in_yImage);
    },

    getCanvas: function (in_rectClipping) {
        if (in_rectClipping === undefined || in_rectClipping === null) {
            return this._canvas;
        }

        var ctxDocument = this._canvas.getContext('2d');
        var imageData = ctxDocument.getImageData(in_rectClipping.x, in_rectClipping.y, in_rectClipping.width, in_rectClipping.height);
        var canvasClipping = document.createElement("canvas");
        var ctxClipping;

        canvasClipping.width = in_rectClipping.width;
        canvasClipping.height = in_rectClipping.height;

        ctxClipping = canvasClipping.getContext('2d');
        ctxClipping.putImageData(imageData, 0, 0);

        return canvasClipping;
    },

    getImageDeferred: function () {
        var strBase64Image = this._canvas.toDataURL('image/png');
        var rectImage = { x: 0, y: 0, width: this._canvas.width, height: this._canvas.height };
        var ewpsImage = new EwpsImage(strBase64Image, rectImage);

        return ewpsImage.getImageDeferred();
    }
};