/// <reference path="EwpsPoint.js" />
/// <reference path="EwpsSize.js" />


var EwpsRect = function (in_x, in_y, in_width, in_height) {
    this._point = new EwpsPoint(in_x, in_y);
    this._size = new EwpsSize(in_width, in_height);
};


EwpsRect.prototype = {
    getPoint: function () {
        return this._point;
    },

    getSize: function () {
        return this._size;
    },

    getX: function () {
        return this._point.getX();
    }
};