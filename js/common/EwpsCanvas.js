/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


var EwpsCanvas = function (in_width, in_height) {
    this._canvas = document.createElement("canvas");
    this._canvas.width = in_width;
    this._canvas.height = in_height;
};

EwpsCanvas.prototype = {
    draw: function (in_image, in_xImage, in_yImage) {
        var context = this._canvas.getContext('2d');

        context.drawImage(in_image, in_xImage, in_yImage);
    },

    getCanvas: function () {
        return this._canvas;
    }
};