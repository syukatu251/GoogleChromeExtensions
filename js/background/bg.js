var bg = {
    captureWholePage: function(callback) {
        var self = this;

        bgContentScripts.page.init(function() {
            bgContentScripts.canvas.init(bgContentScripts.page.getSizeDocument());
            bgContentScripts.page.captureWholePage(function() {
                bgPlugin.save();
            });
        });
    }
};

var bgPlugin = {
    save: function() {
        var strPngBase64 = bgContentScripts.canvas.getSrcImage();
        var plugin = document.getElementById('idPlugin');
        plugin.launchWpPreview(strPngBase64, 'test', 'test.html');
    }
};