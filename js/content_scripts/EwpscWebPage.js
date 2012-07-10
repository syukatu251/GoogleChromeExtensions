/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


var EwpscWebPage = {
    scroll: function (in_x, in_y) {
        $('body').scrollLeft(in_x).scrollTop(in_y);
    },

    getSizeWindow: function () {
        var widthWindow = $(window).width();
        var heightWindow = $(window).height();

        return { width: widthWindow, height: heightWindow };
    },

    getPointScrollBar: function () {
        var scrollX = $('body').scrollLeft();
        var scrollY = $('body').scrollTop();

        return { x: scrollX, y: scrollY };
    }
};