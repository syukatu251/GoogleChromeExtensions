/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />


$(document).ready(function () {
    var background = chrome.extension.getBackgroundPage().EwpsBackgroundTest;
    $('#idTest1').click(background.test1);
    $('#idTest2').click(background.test2);
});