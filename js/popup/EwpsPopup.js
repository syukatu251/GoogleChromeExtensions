/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />



var EwpsPopup = {
    captureWholePage: function () {
        var background = chrome.extension.getBackgroundPage().EwpsBackground;
        background.captureWholePage();
    }
};


$(document).ready(function () {
    $('#idButton').click(EwpsPopup.captureWholePage);
});