﻿/// <reference path="../../libs/jquery-1.8.1.js" />
/// <reference path="CsgImageData.js" />
/// <reference path="CsgLocalDirectory.js" />
/// <reference path="CsgView.js" />



var CsgApp = Object.create({}, {
    "initialize": {
        value: function () {
            var self = this;
            var arrayDfd = [];

            $("#csStartButton").click(function () {
                var jqSrcDfd = CsgImageData.getJqSrcDfd();

                if (arrayDfd.length === 0) {
                    arrayDfd = new Array(jqSrcDfd.length + 1);
                    for (var i = 0; i < arrayDfd.length; i++) {
                        arrayDfd[i] = $.Deferred();
                    }
                    arrayDfd[0].resolve();
                }

                CsgView.removeImage();

                jqSrcDfd.each(function (out_index, out_dfdSrc) {
                    arrayDfd[out_index].done(function (out_jqImg) {
                        if (out_jqImg && out_jqImg.src) {
                            CsgView.appendImage(jqImg);
                        } else {
                            out_dfdSrc.done(function (out_src) {
                                var jqImg = $("<img>").attr("src", out_src).width($(document).width() / 2 - 5);
                                var idSetTimeout = setTimeout(function () {
                                    jqImg.trigger("load");
                                }, 15000);
                                try {
                                    jqImg.on("load", function () {
                                        clearTimeout(idSetTimeout);
                                        CsgView.appendImage(jqImg);
                                        arrayDfd[out_index] = $.Deferred().resolve(jqImg);
                                        arrayDfd[out_index + 1].resolve();
                                    });
                                } catch (e) {
                                    console.log(e);
                                }
                                
                                //if (!out_src) {
                                //    console.log("failed to get src", out_index);
                                //    jqImg.trigger("load");
                                //}
                            });
                        }
                    });
                });
                
                //CsgImageData.jq.each(function (out_index, out_strUrl) {
                //    var binder = {};
                //    var closureJqGet = self.getClosureJqGet.bind(binder)(out_strUrl);
                //    closureJqGet();
                //});
            });
            $("#csEndButton").click(function () {
                arrayDfd = [];
                CsgView.removeImage();
            });
        }
    }
});

setTimeout(function () {
    CsgApp.initialize();
}, 1000);