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

    getCanvas: function (in_rectClip) {
        if (in_rectClip === undefined || in_rectClip === null) {
            return this._canvas;
        }

        var ctxDocument = this._canvas.getContext('2d');
        var imageData = ctxDocument.getImageData(in_rectClip.x, in_rectClip.y, in_rectClip.width, in_rectClip.height);
        var canvasClip = document.createElement("canvas");
        var ctxClip;

        canvasClip.width = in_rectClip.width;
        canvasClip.height = in_rectClip.height;

        ctxClip = canvasClip.getContext('2d');
        ctxClip.putImageData(imageData, 0, 0);

        return canvasClip;
    },

    getImageDeferred: function () {
        var strBase64Image = this._canvas.toDataURL('image/png');
        var rectImage = { x: 0, y: 0, width: this._canvas.width, height: this._canvas.height };
        var ewpsImage = new EwpsImage(strBase64Image, rectImage);

        return ewpsImage.getImageDeferred();
    }
};