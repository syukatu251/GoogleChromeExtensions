var BgBackground = Object.create({}, {
    "createContextMenus": {
        value: function () {
            chrome.contextMenus.create({
                documentUrlPatterns: ["http://*/*"],
                title: "test",
                id: "test"
            });
        }
    },

    "addListener": {
        value: function () {
            var self = this;
            chrome.tabs.onActivated.addListener(function (activeInfo) {
                self.createContextMenus();
            });
        }
    }
});

BgBackground.addListener();