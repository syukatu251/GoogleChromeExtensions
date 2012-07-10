var EwpsSize = function (in_width, in_height) {
    this._width = in_width;
    this._height = in_height;
};

EwpsSize.prototype = {
    getX: function () {
        return this._width;
    },

    getY: function () {
        return this._height;
    }
};