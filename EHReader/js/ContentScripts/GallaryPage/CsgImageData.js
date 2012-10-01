/// <reference path="../../libs/jquery-1.8.1.js" />


var CsgImageData = Object.create({}, {
    "getJqSrcDfd": {
        value: function (in_index) {
            var getDfdSrc = function (in_anchor) {
                var dfdSrc = $.Deferred();
                $.get(in_anchor.href).done(function (out_html) {
                    dfdSrc.resolve($(out_html).find('img[src$=".jpg"]').attr("src"));
                }).fail(function () {
                    console.log("$.get failed");
                });
                return dfdSrc.promise();
            };

            if (in_index) {
                var anchor = $('a[href^="http://g.e-hentai.org/s/"]').eq(in_index);
                return getDfdSrc(anchor);
            } else {
                return $('a[href^="http://g.e-hentai.org/s/"]').map(function (out_index, out_anchor) {
                    return getDfdSrc(out_anchor);
                });
            }
        }
    },

    "jqImg": {
        get: function () {
            return $('img[src="http://ehgt.org/g/blank.gif"]').parent('a').map(function (out_index, out_anchor) {
                return out_anchor.href;
            });
        }
    },

    "arrayDfdBlob": {
        get: function () {
            var arrayDfdBlob = [];

            $('a[href^="http://g.e-hentai.org/s/"]').map(function (out_index, out_anchor) {
                arrayDfdBlob.push($.Deferred());

                $.get(in_anchor.href).pipe(function (out_html) {
                    return $(out_html).find('img[src$=".jpg"]').attr("src");
                }).done(function (out_strImageSrc) {
                    var x = new XMLHttpRequest();
                    x.open('get', out_strImageSrc);
                    x.responseType = 'blob';
                    x.onload = function (r) {
                        arrayDfdBlob[0].resolve(x.response);
                    };
                    x.send();
                });
            });

            return arrayDfdBlob.forEach(function (out_dfdBlob) {
                out_dfdBlob.promise();
            });
        }
    },

    "dfdArrayImageSrc": {
        get: function () {
            var dfdArrayImageSrc = $.Deferred();
            var arrayImageSrc = [];
            var jqImageAnchor = $('a[href^="http://g.e-hentai.org/s/"]');
            jqImageAnchor.map(function (out_index, out_anchor) {
                $.get(in_anchor.href).done(function (out_html) {
                    arrayImageSrc[out_index] = ($(out_html).find('img[src$=".jpg"]').attr("src"));
                    if (out_index === jqImageAnchor.length) {
                        dfdArrayImageSrc.resolve(arrayImageSrc);
                    }
                })
            });

            return dfdArrayImageSrc.promise();
        }
    },

    "length": {
        get: function () {
            return $('a[href^="http://g.e-hentai.org/s/"]').length;
        }
    },

    "arrayDfdBlob": {
        get: function () {
            var arrayDfdBlob = [];
            var length = this.length;
            for (var i = 0; i < length; i++) {
                arrayDfdBlob[i] = $.Deferred();
            }

            this.dfdArrayImageSrc.done(function (out_arrayImageSrc) {
                (function getDfdBlob(in_indexImage) {
                    var x = new XMLHttpRequest();
                    x.open('get', out_arrayImageSrc[in_indexImage]);
                    x.responseType = 'blob';
                    x.onreadystatechange = function () {
                        console.log(x.readyState, in_indexImage);
                        if (x.readyState === 4) {
                            if (x.status === 200) {
                                arrayDfdBlob[in_indexImage].resolve(x.response);
                            } else {
                                console.log("failed to get image", x.status);
                                arrayDfdBlob[in_indexImage].resolve(null);
                            }
                            if (in_indexImage + 1 < out_arrayImageSrc.length) {
                                getDfdBlob(in_indexImage + 1);
                            }
                        }
                    };
                    x.send();
                }(0));
            });

            return arrayDfdBlob;
        }
    },

    "dfdArrayBlob": {
        get: function () {
            return this.getDfdArrayBlob();
        }
    },

    "getDfdArrayBlob": {
        value: function (in_indexStart, in_indexEnd) {
            var dfdArrayImageSrc = this.dfdArrayImageSrc;
            var indexStart = 0;
            var indexEnd = dfdArrayImageSrc.length - 1;

            if ($.isNumeric(in_indexStart)) {
                indexStart = in_indexStart;
            }
            if ($.isNumeric(in_indexEnd) && in_indexEnd < indexEnd) {
                indexEnd = in_indexEnd;
            }

            var dfdArrayBlob = $.Deferred();
            dfdArrayImageSrc.done(function (out_arrayImageSrc) {
                var arrayBlob = [];
                (function getBlob(in_indexImage) {
                    var x = new XMLHttpRequest();
                    x.open('get', out_arrayImageSrc[in_indexImage + indexStart]);
                    x.responseType = 'blob';
                    x.onload = function (r) {
                        arrayBlob[in_indexImage] = x.response;
                        if (in_indexImage + 1 < indexEnd - indexStart) {
                            getBlob(in_indexImage + 1);
                        } else {
                            dfdArrayBlob.resolve(arrayBlob);
                        }
                    };
                    x.send();
                }(0));
            });

            return dfdArrayBlob.promise();
        }
    }
});