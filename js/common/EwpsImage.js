/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


var EwpsImage = function (in_rect, in_strBase64Image) {
    var self = this;
    var dfdLoad = $.Deferred();

    this._rect = { x: in_rect.x, y: in_rect.y, width: in_rect.width, height: in_rect.height };
    this._jqImage = $('<img />');
    this._dfdLoad = dfdLoad.promise();

    this._jqImage.load(function () {
        dfdLoad.resolve();
    });
    this._jqImage.attr('src', in_strBase64Image);
};

EwpsImage.prototype = {
    getRect: function () {
        var self = this;

        return { x: self._rect.x, y: self._rect.y, width: self._rect.width, height: self._rect.height };
    },

    getImageDeferred: function () {
        var ret_dfd = $.Deferred();
        var image;

        $.when(this._dfdLoad)
        .done(function () {
            image = this._jqImage.get()[0];
            ret_dfd.resolve(image);
        });

        return ret_dfd.promise();
    }
};