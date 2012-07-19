/// <reference path="../libs/jquery-1.7.2-vsdoc.js" />
/// <reference path="EwpspBackground.js" />


$(document).ready(function () {
    $('#idButtonCaptureWholePage').click(EwpspBackground.captureWholePage);
    $('#idButtonAppendCoverForClip').click(EwpspBackground.appendCoverForClip);
    $('#idButtonRemoveCoverForClip').click(EwpspBackground.removeCoverForClip);
    $('#idButtonCaptureClipRectangle').click(EwpspBackground.captureClipRectangle);
});