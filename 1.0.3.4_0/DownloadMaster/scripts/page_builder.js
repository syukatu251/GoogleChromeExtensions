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
/// Build delimiter
////////////////////////////////////////////////////////////////////
function buildDelimiter(parentElem) {

    var delimDiv = document.createElement('div');
    delimDiv.name = DELIM_DIVS_NAME;
    delimDiv.appendChild(document.createElement('hr'));

    parentElem.appendChild(delimDiv);
}


////////////////////////////////////////////////////////////////////
/// Build message div
////////////////////////////////////////////////////////////////////
function buildMessageDiv(message) {
    var noLinksMsgDiv = document.getElementById(NO_LINKS_MESSAGE_DIV_ID);

    // Clear previous message
    $('.messageToUser').empty();

    noLinksMsgDiv.appendChild(document.createElement('hr'));
    noLinksMsgDiv.appendChild(document.createElement('br'));
    noLinksMsgDiv.appendChild(document.createTextNode(message));

    noLinksMsgDiv.style.font = TEXT_FONT_SIZE + " " + TEXT_FONT_TYPE;
}


function clearDefaultMessage() {
    var noLinksMsgDiv = document.getElementById(NO_LINKS_MESSAGE_DIV_ID);
    var childArr = noLinksMsgDiv.childNodes;

    for (var i = 0; i < childArr.length; ++i) {
        noLinksMsgDiv.removeChild(childArr[i]);
    }
    noLinksMsgDiv.innerHTML = "";
}
function linksMsgToGlobalStorage(msg) {
    var linksCnt = msg.links.length;
    for (var i = 0; i < linksCnt; ++i) {
        var linkMsg = msg.links.pop();
        var linkStoreId = gLinksStorage.addLink(linkMsg.link);
        if (linkMsg.linkName != undefined && $.trim(linkMsg.linkName) != "") {
            gLinksStorage.addName(linkStoreId, linkMsg.linkName);
        }
    }
}
function isMessageEmpty(msg) {
    if (msg.links.length < 1) {
        return true;
    }
    else {
        return false;
    }
}
function handleEmptyMessage() {        
    buildMessageDiv(NO_LINKS_MSG);        
}

////////////////////////////////////////////////////////////////////
/// Build extension page with links received from content script
////////////////////////////////////////////////////////////////////
function buildThePage(msg) {

    // REFACTORING
    // Content script message should be translated in a single location
    // All other enitities should work with the storage

    try {

        clearDefaultMessage();

        if (isMessageEmpty(msg) == true) {
            handleEmptyMessage();
            return;
        }

        linksMsgToGlobalStorage(msg);

        var extensionBodyElem = document.createElement('div');
        extensionBodyElem.id = EXTENSION_BODY_DIV_ID;

        buildDelimiter(extensionBodyElem);

        buildFiltersDiv(extensionBodyElem);

        buildDelimiter(extensionBodyElem);

        buildLinksTable(extensionBodyElem);        

        buildDelimiter(extensionBodyElem);

        buildFooter(extensionBodyElem);

        $(document.body).append(extensionBodyElem);
        setExtensionPageDimentions(extensionBodyElem);
    }
    catch (e) {
        alertExceptionDetails(e);
    }
}


////////////////////////////////////////////////////////////////////
/// Set extension page dimentions
////////////////////////////////////////////////////////////////////
function setExtensionPageDimentions(extBodyElem) {

    try {
        setExtensionPageWidth();
        setExtensionPageHeight(extBodyElem);
    }
    catch (e) {
        alertExceptionDetails(e);
    }
}
function setExtensionPageHeight(extBodyElem) {    
    if ($(document).height() > POP_UP_EXT_HEIGHT_MAX) {
        $("#" + DOWNLOAD_LIST_DIV_ID).css("overflowY", "scroll");
        var totalWithoutListHeight = $(document).height() - $("#" + DOWNLOAD_LIST_DIV_ID).height();
        $("#" + DOWNLOAD_LIST_DIV_ID).height(POP_UP_EXT_HEIGHT_MAX - totalWithoutListHeight);
    }
}
function setExtensionPageWidth() {

    var tableWidth = $(document).width();

    if (tableWidth < PAGE_MINIMUM_WIDTH) {
        $(document.body).width(PAGE_MINIMUM_WIDTH);        
    }
    else if (tableWidth < POP_UP_EXT_WIDTH_MAX) {
        $(document.body).width(tableWidth - SCROLLER_WIDTH);
    }
    else {
        $(document.body).width(POP_UP_EXT_WIDTH_MAX - SCROLLER_WIDTH);
    }
}

