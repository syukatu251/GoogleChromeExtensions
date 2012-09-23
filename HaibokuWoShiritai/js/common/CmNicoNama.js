/// <reference path="../libs/jquery-1.8.1.js" />


var CmNicoNama = Object.create({}, {
    getDfdDate: {
        value: function (in_strUrl) {
            var jqData;
            var dfdDate = $.Deferred();

            $.get(in_strUrl).done(function (out_data) {
                jqData = $(out_data);

                var strKaijo = jqData.find("div.kaijo").text();

                var strDate = strKaijo.match(/\d{4}\/\d{1,2}\/\d{1,2}/m);
                var strTime = strKaijo.match(/\d{1,2}:\d{1,2}/);

                if (strDate && strTime) {
                    var dateStartTime = new Date(strDate + " " + strTime);

                    dfdDate.resolve(dateStartTime);
                } else {
                    dfdDate.reject();
                }
            }).fail(function () {
                dfdDate.reject();
            });

            return dfdDate.promise();
        }
    }
});

//$.when(CmNicoNama.getDfdDate()).done(function (out_date) {
//    console.log(out_date);
//});