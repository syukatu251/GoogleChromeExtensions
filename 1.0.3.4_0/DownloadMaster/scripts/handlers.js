// ################################################
// ###### FOR INTELLISENSE
// ######
/// <reference path="..\..\..\..\APIs\chrome_extensions.js" />
/// <reference path="..\..\..\..\APIs\webkit_console.js" />
/// <reference path="..\..\..\..\APIs\w3c_dom1.js" />
/// <reference path="..\..\..\..\APIs\w3c_dom2.js" />
/// <reference path="..\..\..\..\APIs\w3c_dom3.js" />
/// <reference path="..\..\..\..\APIs\w3c_xml.js" />
/// <reference path="jquery-1.7.2.min.js" />
/// <reference path="globals.js" />
/// <reference path="utils.js" />
/// <reference path="links_storage.js" />
// ################################################


////////////////////////////////////////////////////////////////////
/// Google Analytics event tracker
////////////////////////////////////////////////////////////////////
function trackButton(buttonName) {
    _gaq.push(['_trackEvent', buttonName, 'clicked']);
};

////////////////////////////////////////////////////////////////////
/// On link checkbox check
////////////////////////////////////////////////////////////////////
function onLinkCheck() {

    // Link checked
    if (window.event.srcElement.checked == true) {
        selectLink(window.event.srcElement.id);
    }
    else { // Link unchecked
        unselectLink(window.event.srcElement.id);
    }
}


////////////////////////////////////////////////////////////////////
/// Change link checkbox state
////////////////////////////////////////////////////////////////////
function selectLink(linkId) {
    document.getElementById(linkId).checked = true; // check the link
    changeLinkColor(linkId, SELECTED_LINK_COLOR);
    moveLinkToTop(linkId);
}
function unselectLink(linkId) {
    document.getElementById(linkId).checked = false; // uncheck link
    changeLinkColor(linkId, UNSELECTED_LINK_COLOR);
    moveLinkToBottom(linkId);
}
function changeLinkColor(linkId, color) {
    var elem = document.getElementById(LINK_ROW_ELEM_ID_PREFIX + linkId);
    elem.style.backgroundColor = color;
}
function moveLinkToTop(linkId) {
    var link = document.getElementById(LINK_ROW_ELEM_ID_PREFIX + linkId);
    var linkTbl = document.getElementById(LINKS_TABLE_ID);

    linkTbl.removeChild(link);
    linkTbl.insertBefore(link, linkTbl.firstChild);
}
function moveLinkToBottom(linkId) {
    var link = document.getElementById(LINK_ROW_ELEM_ID_PREFIX + linkId);
    var linkTbl = document.getElementById(LINKS_TABLE_ID);

    linkTbl.removeChild(link);
    linkTbl.appendChild(link);
}
function unselectAllLinks() {
    var allIds = gLinksStorage.getAllIds();
    for (var i = 0; i < allIds.length; ++i) {
        unselectLink(allIds[i]);
    }
}


////////////////////////////////////////////////////////////////////
/// Hide irelevant links on filter activation
////////////////////////////////////////////////////////////////////
function onFilterCheck() {
    try {

        clearCustomFilter();

        var filteredLinksIds = gLinksStorage.getIds(window.event.srcElement.name);

        // For all ids of current filter
        for (var i = 0; i < filteredLinksIds.length; ++i) {

            // Filter checked
            if (window.event.srcElement.checked == true) {
                selectLink(filteredLinksIds[i]);
            }
            else { // Filter unchecked                
                unselectLink(filteredLinksIds[i]);
            }
        }
    }
    catch (exc) {
        alertExceptionDetails(exc);
    }
}

////////////////////////////////////////////////////////////////////
/// Master filter sets\unsets all other filters
////////////////////////////////////////////////////////////////////
function onMasterFilterCheck() {
    try {
        var extArr = gLinksStorage.getExtensions();

        for (var i = 0; i < extArr.length; ++i) {
            document.getElementsByName(extArr[i])[0].checked = window.event.srcElement.checked;

            window.event.srcElement.name = extArr[i];
            onFilterCheck();
        }

    } catch (e) { alertExceptionDetails(e); }
}


////////////////////////////////////////////////////////////////////
/// Custom filter
////////////////////////////////////////////////////////////////////
function applyCustomFilter() {

    var filterStr = window.event.srcElement.value.toLowerCase();
    var allIds = gLinksStorage.getAllIds();

    // uncheck all file extensions filters
    var extFilters = document.getElementById(EXT_FILTERS_DIV_ID).getElementsByTagName('input');
    for (var i = 0; i < extFilters.length; ++i) {
        extFilters[i].checked = false;
    }

    // Uncheck on empty filter string 
    if ($.trim(filterStr) == "") {
        unselectAllLinks();
        return;
    }

    // apply filter string
    for (var i = 0; i < allIds.length; ++i) {

        if (gLinksStorage.getLink(allIds[i]).toLowerCase().indexOf(filterStr) != -1) {
            selectLink(allIds[i]);
        }
        else {
            unselectLink(allIds[i]);
        }
    }
}
function clearCustomFilter() {

    // Check if custom filter exists
    if (document.getElementById(CUSTOM_FILTER_INPUT_ID) == undefined) {
        return;
    }

    if (document.getElementById(CUSTOM_FILTER_INPUT_ID).value != "") {
        unselectAllLinks();
    }
    document.getElementById(CUSTOM_FILTER_INPUT_ID).value = "";
}

////////////////////////////////////////////////////////////////////
/// On feedback link click, open blog in new tab
////////////////////////////////////////////////////////////////////
function onClickFeedback() {
    chrome.tabs.create({ "url": "http://monadownloadmaster.blogspot.com", "selected": true });    
    
    // Google Analytic event
    trackButton("blog_button");
}


///////////////////////////////////////////////////////////////////////////////////
// POP UP DOWNLOAD CONFIRMATION DIALOG WAS REMOVED DUE TO USER COMPLAINTS
///////////////////////////////////////////////////////////////////////////////////
//function displayConfirmationDialog(dialogText, okFunc, okFuncParam, cancelFunc, dialogTitle) {
//    $("<div style=\"font: " + TEXT_FONT_SIZE + " " + TEXT_FONT_TYPE + " ;padding: 10px; max-width: 500px; word-wrap: break-word;\">" + dialogText + "</div>").dialog({
//        draggable: true,
//        modal: true,
//        resizable: false,
//        width: 'auto',
//        title: dialogTitle,
//        minHeight: 75,
//        buttons: {
//            "OK": function () {
//                if (typeof (okFunc) == 'function') { okFunc(okFuncParam); }
//                $(this).dialog('destroy');
//            },
//            Cancel: function () {
//                $(this).dialog('destroy');
//            }
//        }
//    });
//}
//function downloadConfirmed(checkedLinks) {
//    try {

//        // Google Analytic event
//        trackButton("download_confirm_ok_button");

//        // Send checked links to content script
//        gContentConnectionPort.postMessage({
//            downloadFilesArr: checkedLinks,
//            downloadFilesArrLen: checkedLinks.length
//        });
//    }
//    catch (exc) {
//        alertExceptionDetails(exc);
//    }
//}
//function downloadCanceled() {

//    // Google Analytic event
//    trackButton("download_confirm_ok_button");
//    
//    // On cancelation do nothing
//}
///////////////////////////////////////////////////////////////////////////////////

function onDownloadClick() {

    try {

        // Google Analytic event
        trackButton("download_button");

        // Get all checked links
        var checkedLinks = new Array();

        var inputTags = document.getElementsByTagName('input');
        for (var i = 0; i < inputTags.length; i++) {
            if (inputTags[i].type == "checkbox" && inputTags[i].id != "" && inputTags[i].checked) {
                var linkId = inputTags[i].id.toString().replace(LINK_ROW_ELEM_ID_PREFIX, '');
                checkedLinks.push(gLinksStorage.getLink(linkId));
            }
        }

        // Don't send message with empty list
        if (checkedLinks.length < 1) {
            return;
        }

        // Send checked links to content script
        gContentConnectionPort.postMessage({
            downloadFilesArr: checkedLinks,
            downloadFilesArrLen: checkedLinks.length
        });

///////////////////////////////////////////////////////////////////////////////////
// POP UP DOWNLOAD CONFIRMATION DIALOG WAS REMOVED DUE TO USER COMPLAINTS
///////////////////////////////////////////////////////////////////////////////////
//        // No need a confirmation for small amount of files
//        if (checkedLinks.length < DOWNLOAD_CONFIRM_MIN_LIMIT){
//            downloadConfirmed(checkedLinks);
//            return;
//        }
//
//        var dowloadConfirmationMessage =
//            "<br>You are about to download <b>" + checkedLinks.length + " files</b>." +
//            "<br><br><b>Click OK if you didn't change Chrome download settings.</b>" +
//            "<br><br>In case you set the " +
//            "\"Ask where to save each file before downloading\",<br>" +
//            "Chrome will do exactly that for each file. <br><br>" +
//            "Do you want to proceed?";
//
//        displayConfirmationDialog(
//            dowloadConfirmationMessage,
//            downloadConfirmed,
//            checkedLinks,
//            downloadCanceled,
//            'Confirm download');
///////////////////////////////////////////////////////////////////////////////////

    } catch (exc) {
        alertExceptionDetails(exc);
    }
}