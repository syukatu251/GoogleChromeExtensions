/// <reference path="../../libs/jquery-1.8.1.js" />


var CsgImageData = Object.create({}, {
    "getDfdArrayImageSrc": {
        value: function (in_indexStart, in_indexEnd) {
            var jqImageAnchor = $('a[href^="http://g.e-hentai.org/s/"]');
            var indexStart = 0;
            var indexEnd = jqImageAnchor.length;
            if ($.isNumeric(in_indexStart)) {
                indexStart = parseInt(in_indexStart, 10);
            }
            if ($.isNumeric(in_indexEnd)) {
                indexEnd = parseInt(in_indexEnd, 10);
            }

            var dfdArrayImageSrc = $.Deferred();
            var arrayImageSrc = [];
            
            (function getImageSrc(in_indexImage) {

                $('#csLog').text(indexStart + in_indexImage + 1);
                console.log("getImageSrc", indexStart + in_indexImage);

                $.ajax(jqImageAnchor.eq(in_indexImage + indexStart).attr('href'), {
                    beforeSend: function (out_xhr) {
                        CsgImageData.xhr = out_xhr;
                    }
                }).done(function (out_html) {
                    arrayImageSrc[in_indexImage] = $(out_html).find('img[src$=".jpg"]').attr("src");
                    if (in_indexImage + 1 < indexEnd - indexStart + 1) {
                        getImageSrc(in_indexImage + 1);
                    } else {
                        dfdArrayImageSrc.resolve(arrayImageSrc);
                    }
                }).fail(function (e) {
                    $('#csLog').text("getImageSrc" + ' , ' + e);
                    console.log("getImageSrc", e);
                });
            }(0));

            return dfdArrayImageSrc.promise();
        }
    },

    "length": {
        get: function () {
            return $('a[href^="http://g.e-hentai.org/s/"]').length;
        }
    },

    "getArrayDfdImageInfo": {
        value: function (in_indexStart, in_indexEnd) {
            var self = this;
            var arrayDfdImageInfo = [];
            var length = this.length;
            var indexStart = 0;
            var indexEnd = length;

            if ($.isNumeric(in_indexStart)) {
                indexStart = parseInt(in_indexStart, 10);
            }
            if ($.isNumeric(in_indexEnd)) {
                indexEnd = parseInt(in_indexEnd, 10);
            }


            for (var i = 0; i < indexEnd - indexStart + 1; i++) {
                arrayDfdImageInfo[i] = $.Deferred();
            }

            var dfdArrayImageSrc = this.getDfdArrayImageSrc(indexStart, indexEnd);

            dfdArrayImageSrc.done(function (out_arrayImageSrc) {
                // 配列の前の要素のajax通信が終わってからajax通信を開始する
                (function getDfdImageInfo(in_indexImage) {

                    $('#csLog').text(indexStart + in_indexImage + 1);
                    console.log("getDfdImageInfo", indexStart + in_indexImage);

                    var x = new XMLHttpRequest();
                    CsgImageData.xhr = x;
                    x.open('get', out_arrayImageSrc[in_indexImage]);
                    x.responseType = 'blob';
                    x.onreadystatechange = function () {
                        console.log("onreadystatechange", x.readyState, indexStart + in_indexImage);

                        if (x.readyState === 4) {
                            if (x.status === 200 && x.response.size > 50) {
                                arrayDfdImageInfo[in_indexImage].resolve({
                                    blob: x.response,
                                    strImageName: self.getStrImageName(in_indexImage + indexStart + 1)
                                });
                            } else {
                                console.log("failed to get image", x.status);
                                arrayDfdImageInfo[in_indexImage].resolve(null);
                            }
                            if (!CsgImageData.abort && in_indexImage + 1 < out_arrayImageSrc.length) {
                                getDfdImageInfo(in_indexImage + 1);
                            }
                        }
                    };
                    x.send();
                }(0));
            });

            return arrayDfdImageInfo;
        }
    },
    "getStrImageName": {
        value: function (in_indexImageAlt) {
            return $('#gj').text() + '_' + ("00" + in_indexImageAlt).slice(-3) + '.jpg';
        }
    },

    "xhr": {
        value: null,
        writable: true
    },

    "abort": {
        value: function () {
            if (!CsgImageData.xhr) {
                CsgImageData.xhr.abort();
                CsgImageData.xhr = null;
            }
        }
    }
});