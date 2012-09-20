var CmTabs = Object.create({}, {
    "dfdActiveTab": {
        get: function () {
            var dfd = $.Deferred();

            chrome.tabs.query({ currentWindow: true, active: true }, function (out_arrayTab) {
                dfd.resolve(out_arrayTab[0]);
            });

            return dfd.promise();
        }
    }
});