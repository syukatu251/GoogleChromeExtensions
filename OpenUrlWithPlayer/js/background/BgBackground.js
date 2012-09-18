var BgBackground = Object.create({}, {
    "createContextMenus": {
        value: function () {
            chrome.contextMenus.create({
                documentUrlPatterns: ["http://*/*"],
                title: "open url with gom player",
                id: "openUrl",
                contexts: ["link"]
            });
        }
    },

    "addListener": {
        value: function () {
            var self = this;

            self.createContextMenus();


            chrome.contextMenus.onClicked.addListener(function (out_clickData, out_tab) {
                console.log(out_clickData.linkUrl);
                var regexp = /^http/;
                var strMmsUrl = out_clickData.linkUrl.replace(regexp, "mms");
                console.log(strMmsUrl);
                //var plugin = document.getElementById("idPlugin");
                //plugin.createProcess("notepad.exe");
            });
        }
    }
});

BgBackground.addListener();