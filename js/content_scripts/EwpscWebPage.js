/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


var EwpscWebPage = {
    scroll: function (in_x, in_y) {
        $('body').scrollLeft(in_x).scrollTop(in_y);
    },

    getRectWindow: function () {
        var xWindow = $('body').scrollLeft();
        var yWindow = $('body').scrollTop();
        var widthWindow = $(window).width();
        var heightWindow = $(window).height();

        return { x: xWindow, y: yWindow, width: widthWindow, height: heightWindow };
    },

    getRectDocument: function () {
        var widthDocument = $(document).width();
        var heightDocument = $(document).height();

        return { x: 0, y: 0, width: widthWindow, height: heightWindow };
    },

    getPointScrollBar: function () {
        var scrollX = $('body').scrollLeft();
        var scrollY = $('body').scrollTop();

        return { x: scrollX, y: scrollY };
    }
};