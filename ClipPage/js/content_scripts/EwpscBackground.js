
/// <reference path="EwpscChrome.js" />

var EwpscBackground = {
    addListenerToScroll: function (in_callback) {
        EwpscChrome.addListener('scroll', in_callback);
    },

    addListenerToGetRectWindow: function (in_callback) {
        EwpscChrome.addListener('getRectWindow', in_callback);
    },

    addListenerToGetRectDocument: function (in_callback) {
        EwpscChrome.addListener('getRectDocument', in_callback);
    },

    addListenerToGetPointScrollBar: function (in_callback) {
        EwpscChrome.addListener('getPointScrollBar', in_callback);
    },

    addListenerToAppendCoverForClip: function (in_callback) {
        EwpscChrome.addListener('appendCoverForClip', in_callback);
    },

    addListenerToRemoveCoverForClip: function (in_callback) {
        EwpscChrome.addListener('removeCoverForClip', in_callback);
    },

    addListenerToGetRectClipRectangle: function (in_callback) {
        EwpscChrome.addListener('getRectClipRectangle', in_callback);
    }
};