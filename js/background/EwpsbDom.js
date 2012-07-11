/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />
/// <reference path="EwpsbContentScripts.js" />


var EwpsbDom = function (in_strElement) {
    this._strElement = in_strElement;
};


EwpsbDom.prototype = {
    getRectDeferred: function () {
        var size;
        var ret_dfd = $.Deferred();
        var dfdGetRect;

        switch (this._strElement) {
            case 'window':
                dfdGetRect = EwpsbContentScripts.getRectWindowDeferred();
                break;

            case 'document':
                dfdGetRect = EwpsbContentScripts.getRectDocumentDeferred();
                break;

            default:
                dfdGetRect = null;
                break;
        }

        if (dfdGetRect === null) {
            ret_dfd.reject();

            return ret_dfd.promise();
        }

        dfdGetRect.done(function (out_size) {
            ret_dfd.resolve(out_size);
        });


        return ret_dfd.promise();
    },

    setPointDeferred: function (in_x, in_y) {
        var dfd = $.Deferred();
        var dfdSetPointWindow = EwpsbContentScripts.setPointWindowDeferred(in_x, in_y);

        dfdSetPointWindow.done(function () {
            dfd.resolve();
        });

        return dfd.promise();
    },
};