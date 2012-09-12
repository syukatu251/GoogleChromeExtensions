var PuBackground = Object.create({}, {
    "background": {
        get: function () {
            return chrome.extension.getBackgroundPage().BgBackground;
        }
    },
    "callFunction": {
        value: function (in_strFunction) {
            return this.background.callFunction(in_function);
        }
    }
});