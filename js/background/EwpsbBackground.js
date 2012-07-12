/// <reference path="EwpsbWebPage.js" />
/// <reference path="EwpsbPlugin.js" />



var EwpsbBackground = {
    captureWholePage: function () {
        var self = this;
        var webPage = new EwpsbWebPage();

        $.when(webPage.captureDocumentDeferred())
        .done(function (out_canvas) {
            console.log(out_canvas);
            EwpsbPlugin.save('test', 'test.html', out_canvas.toDataURL('image/png'));
        });
    }
};
