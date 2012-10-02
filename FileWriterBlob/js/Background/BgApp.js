/// <reference path="../libs/jquery-1.8.1.js" />
/// <reference path="../Common/CmFileSystem.js" />




var BgApp = Object.create({}, {
    "initialize": {
        value: function () {
            var x = new XMLHttpRequest();
            x.open('get', 'http://www.hatena.ne.jp/users/y-/y-kawaz/user_p.gif');
            x.responseType='blob';
            x.onload = function (r) {
                var blob = x.response;
                var directory = new CmDirectory("test", 1024 * 1024);
                directory.saveBlob(blob, "user_p.gif");
            };
            x.send();
        }
    }
});

BgApp.initialize();