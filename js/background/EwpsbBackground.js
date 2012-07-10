/// <reference path="EwpsbContentScripts.js" />
/// <reference path="EwpsbPlugin.js" />



var EwpsbBackground = {
    captureWholePage: function () {
        


        var self = this;

        bgContentScripts.page.init(function() {
            bgContentScripts.canvas.init(bgContentScripts.page.getSizeDocument());
            bgContentScripts.page.captureWholePage(function() {
                bgPlugin.save('test', 'test.html');
            });
        });
    }
};
