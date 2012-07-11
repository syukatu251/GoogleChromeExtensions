

var EwpsCanvas = function (in_width, in_height) {
    this._canvas = document.createElement("canvas");
    this._canvas.width = in_width;
    this._canvas.height = in_height;
};

EwpsCanvas.prototype = {
    draw: function (in_image, in_pointImage) {
        var context = this._canvas.getContext('2d');

        context.drawImage(in_image, in_pointImage.x, in_pointImage.y);
    }
};