
/// <reference path="EwpscChrome.js" />

var EwpscBackground = {
    addListenerToScroll: function (in_callback) {
        EwpscChrome.addListener('scroll', in_callback);
    },

    addListenerToGetSizeWindow: function (in_callback) {
        EwpscChrome.addListener('getSizeWindow', in_callback);
    },

    addListenerToGetPointScrollBar: function (in_callback) {
        EwpscChrome.addListener('getPointScrollBar', in_callback);
    }
};