/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />
/// <reference path="EwpsbContentScripts.js" />


var EwpsbDom = function (in_strElement) {
    this._strElement = in_strElement;
};


EwpsbDom.prototype = {
    getSizeDeferred: function () {
        var size;
        var ret_dfd = $.Deferred();
        var dfdGetSize;

        switch (this._strElement) {
            case 'window':
                dfdGetSize = EwpsbContentScripts.getSizeWindowDeferred();
                break;

            case 'document':
                dfdGetSize = EwpsbContentScripts.getSizeDocumentDeferred();
                break;

            default:
                dfdGetSize = null;
                break;
        }

        if (dfdGetSize === null) {
            ret_dfd.reject();

            return ret_dfd.promise();
        }

        dfdGetSize.done(function (out_size) {
            ret_dfd.resolve(out_size);
        });


        return ret_dfd.promise();
    },

    getWidthDeferred: function () {
        var ret_dfd = $.Deferred();
        var dfdGetSize = this.getSizeDeferred();

        dfdGetSize.done(function (out_size) {
            var width = out_size.width;

            ret_dfd.resolve(width);
        });

        return ret_dfd.promise();
    },

    getHeightDeferred: function () {
        var ret_dfd = $.Deferred();
        var dfdGetSize = this.getSizeDeferred();

        dfdGetSize.done(function (out_size) {
            var height = out_size.height;

            ret_dfd.resolve(height);
        });

        return ret_dfd.promise();
    }
};