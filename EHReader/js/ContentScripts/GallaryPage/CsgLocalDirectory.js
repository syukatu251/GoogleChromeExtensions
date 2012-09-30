var CsgLocalDirectory = Object.create({}, {
    "saveImage": {
        value: function (in_strTitle, in_strImageUrl) {
            chrome.extension.sendMessage({ name: "saveImage", strTitle: in_strTitle, strImageUrl: in_strImageUrl });
        }
    }
});