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
    }
});