/// <reference path="../background/BgContentScript.js" />
/// <reference path="../background/BgBackground.js" />

var BgBackgroundTest = Object.create(BgBackground, {
    "getJqDocumentDeffered": {
        value: function () {
            var dfd = this.contentScript.callFunction(function () {
                return $(this.document);
            });
            $.when(dfd).done(function (out_jqDocument) {
                console.log(out_jqDocument.width);
            });
        }
    }
});