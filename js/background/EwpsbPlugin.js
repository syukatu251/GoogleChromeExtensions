
var EwpsbPlugin = {
    saveWp: function (in_strTitle, in_strUrl, in_strBase64Image) {
        var plugin = document.getElementById('idPlugin');
        plugin.launchWpPreview(in_strBase64Image, in_strTitle, in_strUrl);
    },

    saveClip: function (in_strTitle, in_strUrl, in_strBase64Image, in_widthDocument) {
        var plugin = document.getElementById('idPlugin');
        plugin.launchClipPreview(in_strBase64Image, in_strTitle, in_strUrl, in_widthDocument);
    }
};