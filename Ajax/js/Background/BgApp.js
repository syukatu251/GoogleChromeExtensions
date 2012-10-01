/// <reference path="../libs/jquery-1.8.1.js" />
/// <reference path="../libs/FileSaver.js" />



var BgApp = Object.create({}, {
    "initialize": {
        value: function () {
            //$.ajax({
            //    url: "http://www.hatena.ne.jp/users/y-/y-kawaz/user_p.gif",
            //    dataType: "arraybuffer"
            //}).done(function (out_data) {
            //    console.log(out_data);
            //});
            var x = new XMLHttpRequest();
            x.open('get', 'http://www.hatena.ne.jp/users/y-/y-kawaz/user_p.gif');
            x.responseType='blob';
            x.onload = function (r) {
                var blob = x.response;
                saveAs(blob, "test.gif");
                console.log(blob);
            };
            x.send();
        }
    }
});

BgApp.initialize();