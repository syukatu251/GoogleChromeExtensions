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
/// Append download button and path input to given element
////////////////////////////////////////////////////////////////////
function appendDownloadElements(parentElement) {
    try {

        var downloadElemsDiv = document.createElement('div');
        downloadElemsDiv.style.font = TEXT_FONT_SIZE + " " + TEXT_FONT_TYPE;

        // Add download button        
        var buttonElm = document.createElement('button');
        buttonElm.type = 'button';
        buttonElm.innerHTML = 'Download';
        buttonElm.style.font = TEXT_FONT_SIZE + " " + TEXT_FONT_TYPE;
        buttonElm.setAttribute("padding-top", "100px");
        buttonElm.onclick = function () { onDownloadClick(this) };
        downloadElemsDiv.appendChild(buttonElm);

        parentElement.appendChild(downloadElemsDiv);

    } catch (e) {
        alertExceptionDetails(e);
    }
}

////////////////////////////////////////////////////////////////////
/// Append feedback link to given element
////////////////////////////////////////////////////////////////////
function appendFeedbackLink(parentElement) {
    try {
        // Create feedback link        
        var linkElm = document.createElement('a');
        linkElm.onclick = function () { onClickFeedback(this) };       

        var feedbackImg = document.createElement("img");
        feedbackImg.setAttribute("src", BLOG_LINK_IMAGE);
        feedbackImg.setAttribute("height", BLOG_LINK_HEIGHT);
        feedbackImg.setAttribute("width", BLOG_LINK_WIDTH);        

        linkElm.appendChild(feedbackImg);

        parentElement.appendChild(linkElm);

    } catch (e) {
        alertExceptionDetails(e);
    }
}

////////////////////////////////////////////////////////////////////
/// Build footer
////////////////////////////////////////////////////////////////////
function buildFooter(parentElem) {

    var footerDiv = document.createElement('div');
    footerDiv.id = FOOTER_DIV_ID;    
    footerDiv.style.height = FOOTER_DIV_HEIGHT;

    var btnDiv = document.createElement('div');
    btnDiv.align = 'left';
    appendDownloadElements(btnDiv);

    var leftClm = document.createElement('td');
    leftClm.appendChild(btnDiv);

    var linkDiv = document.createElement('div');
    linkDiv.align = 'right';
    appendFeedbackLink(linkDiv);

    var rightClm = document.createElement('td');
    rightClm.appendChild(linkDiv);

    var row = document.createElement('tr');
    row.appendChild(leftClm);
    row.appendChild(rightClm);

    var table = document.createElement('table');
    table.width = "97%";
    table.cellspacing = "0";
    table.cellpadding = "0";
    table.border = "0";
    table.appendChild(row);
  
    footerDiv.appendChild(table);

    parentElem.appendChild(footerDiv);
}

