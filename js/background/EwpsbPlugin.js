
var EwpsbPlugin = {
    save: function (strTitle, strUrl) {
        var strPngBase64 = bgContentScripts.canvas.getSrcImage();
        var plugin = document.getElementById('idPlugin');
        plugin.launchWpPreview(strPngBase64, 'test', 'test.html');
    }
};