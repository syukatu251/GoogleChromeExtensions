var BgBackground = Object.create({}, {
    "createContextMenus": {
        value: function () {
            chrome.contextMenus.create({
                documentUrlPatterns: ["chrome://*/*"],
                title: "popup debug",
                id: "popupDebug",
                contexts: ["selection"]
            });
        }
    },

    "addListener": {
        value: function () {
            this.createContextMenus();

            chrome.contextMenus.onClicked.addListener(function (out_clickData, out_tab) {
                console.log(out_clickData.selectionText);
                var strUrl = "chrome-extension://" + out_clickData.selectionText + "/popup.html";
                chrome.tabs.create({ url: strUrl });
            });
        }
    }
});

BgBackground.addListener();