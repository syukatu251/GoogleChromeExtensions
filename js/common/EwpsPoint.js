var EwpsPoint = function (in_x, in_y) {
    this._x = in_x;
    this._y = in_y;
};

EwpsPoint.prototype = {
    getX: function () {
        return this._x;
    },

    getY: function () {
        return this._y;
    }
};