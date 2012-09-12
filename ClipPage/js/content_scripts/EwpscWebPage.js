/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />
/// <reference path="../libs/development-bundle/ui/jquery.ui.core.js" />
/// <reference path="../libs/development-bundle/ui/jquery.ui.widget.js" />
/// <reference path="../libs/development-bundle/ui/jquery.ui.mouse.js" />
/// <reference path="../libs/development-bundle/ui/jquery.ui.draggable.js" />
/// <reference path="../libs/development-bundle/ui/jquery.ui.resizable.js" />


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

        return { x: 0, y: 0, width: widthDocument, height: heightDocument };
    },

    getPointScrollBar: function () {
        var scrollX = $('body').scrollLeft();
        var scrollY = $('body').scrollTop();

        return { x: scrollX, y: scrollY };
    },

    appendCoverForClip: function (in_rectClip) {
        if ($('#idCoverForClip').length > 0) {
            return;
        }

        var heightDocument = $(document).height();
        var widthDocument = $(document).width();

        var jqDivCoverForClip = $('<div>')
            .width(widthDocument).height(heightDocument)
            .css({ position: 'absolute', top: 0, left: 0 })
            .attr('id', 'idCoverForClip');


        var jqDivClipRectangle = $('<div>')
            .width(in_rectClip.width).height(in_rectClip.height)
            .attr('id', 'idClipRectangle').attr('position', 'relative')
            .css('border', '1px solid gray')
            .css('cursor', 'move')
            .css({ top: in_rectClip.y, left: in_rectClip.x })
            .resizable({ containment: 'parent', handles: 'all' })
            .draggable({ containment: 'parent' });

        $(jqDivCoverForClip).append(jqDivClipRectangle);
        $('body').append(jqDivCoverForClip);
    },

    removeCoverForClip: function () {
        $('#idCoverForClip').remove();
    },

    getRectClipRectangle: function () {
        if ($('#idCoverForClip').length !== 1) {
            return null;
        }

        var xClipRectangle = $('#idClipRectangle').position().left;
        var yClipRectangle = $('#idClipRectangle').position().top;
        var widthClipRectangle = $('#idClipRectangle').width();
        var heightClipRectangle = $('#idClipRectangle').height();

        return { x: xClipRectangle, y: yClipRectangle, width: widthClipRectangle, height: heightClipRectangle };
    }
};