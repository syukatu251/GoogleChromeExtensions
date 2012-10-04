/// <reference path="../../libs/jquery-1.8.1.js" />
/// <reference path="../../libs/FileSaver.js" />

/// <reference path="CsgImageData.js" />
/// <reference path="CsgLocalDirectory.js" />
/// <reference path="CsgView.js" />
/// <reference path="CsgUser.js" />



var CsgApp = Object.create({}, {
    "initialize": {
        value: function () {
            var self = this;
            var arrayDfd = [];

            CsgView.initialize();

            $("#csStartButton").click(function () {
            });
            $("#csEndButton").click(function () {
                CsgImageData.abort();
                arrayDfd = [];
                CsgView.removeImage();
            });

            CsgView.onClickSaveButton(function () {
                var indexStart = 0;
                var indexEnd = CsgImageData.length;

                if ($.isNumeric(CsgUser.indexStart)) {
                    indexStart = parseInt(CsgUser.indexStart, 10) - 1;
                }
                if ($.isNumeric(CsgUser.indexEnd)) {
                    indexEnd = parseInt(CsgUser.indexEnd, 10) - 1;
                }

                (function saveImage(in_partedStart) {
                    var partedEnd = indexEnd;
                    if (partedEnd - in_partedStart > 10) {
                        partedEnd = in_partedStart + 9;
                    }

                    var arrayDfdBlob = CsgImageData.getArrayDfdImageInfo(in_partedStart, partedEnd);
                    arrayDfdBlob.forEach(function (out_dfdBlob, out_index) {
                        out_dfdBlob.done(function (out_imageInfo) {
                            if (out_imageInfo) {
                                saveAs(out_imageInfo.blob, out_imageInfo.strImageName);
                            }
                            if (out_index >= partedEnd - partedStart) {
                                saveImage(partedEnd + 1);
                            }
                        });
                    });
                }(indexStart));

                for (var i = 0; i < Math.ceil(indexEnd / 10) ; i++) {
                    indexEnd - partedStart > 10 ? partedEnd = partedStart + 9 : partedEnd = indexEnd;

                    var arrayDfdBlob = CsgImageData.getArrayDfdImageInfo(partedStart, partedEnd);
                    arrayDfdBlob.forEach(function (out_dfdBlob, out_index) {
                        out_dfdBlob.done(function (out_imageInfo) {
                            if (out_imageInfo) {
                                saveAs(out_imageInfo.blob, out_imageInfo.strImageName);
                            }
                        });
                    });
                    partedStart = partedEnd + 1;
                }
            });
        }
    }
});

setTimeout(function () {
    CsgApp.initialize();
}, 1000);
