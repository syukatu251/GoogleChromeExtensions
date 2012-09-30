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
/// Build extension page with links received from content script
////////////////////////////////////////////////////////////////////
function buildFiltersDiv(parentElem) {
    try {

        //////////////////////////////////////////////
        // Build the table
        //////////////////////////////////////////////

        var table = document.createElement('table');
        table.width = "97%";
        table.cellspacing = "0";
        table.cellpadding = "0";
        table.border = "0";


        //////////////////////////////////////////////
        // Build first row of filter by file extension        
        //////////////////////////////////////////////

        // Filters div
        var extFilterDiv = document.createElement('div');
        extFilterDiv.id = EXT_FILTERS_DIV_ID;
        extFilterDiv.style.font = TEXT_FONT_SIZE + " " + TEXT_FONT_TYPE;

        // Add filters checkboxes
        var extensionsArr = gLinksStorage.getExtensions();
        for (var i = 0; i < extensionsArr.length; ++i) {
            var extension = extensionsArr[i];
            var input = document.createElement('input');
            input.type = "checkbox";
            input.checked = false;
            input.onclick = function () { onFilterCheck() };
            input.name = extension;
            input.align = 'right';

            extFilterDiv.appendChild(input);
            extFilterDiv.appendChild(document.createTextNode(extension));
        }

        // Add master filter only in case there are more than one filters        
        if (extFilterDiv.childNodes.length > 2) {
            var input = document.createElement('input');
            input.type = "checkbox";
            input.checked = false;
            input.onclick = function () { onMasterFilterCheck() };
            input.align = 'right';
            extFilterDiv.appendChild(input);
            extFilterDiv.appendChild(document.createTextNode("All"));
        }

        // Create first row
        var firstRow = document.createElement('tr');
        firstRow.appendChild(document.createElement('td').appendChild(extFilterDiv));

        table.appendChild(firstRow);


        //////////////////////////////////////////////
        // Build second row of custom filter 
        //////////////////////////////////////////////

        // Add custom filter only in case there are more than one filters
        if (extFilterDiv.childNodes.length > 2) {

            // Custom filter div
            var cstmFilterDiv = document.createElement('div');
            cstmFilterDiv.style.font = TEXT_FONT_SIZE + " " + TEXT_FONT_TYPE;

            // Build custom text filter
            var customTextFilter = document.createElement('input');
            customTextFilter.type = "textbox";
            customTextFilter.autofocus = "autofocus";
            customTextFilter.style.font = TEXT_FONT_SIZE + " " + TEXT_FONT_TYPE;
            customTextFilter.id = CUSTOM_FILTER_INPUT_ID;
            customTextFilter.onkeyup = function () { applyCustomFilter() };

            cstmFilterDiv.appendChild(customTextFilter)

            // Create second row
            var secondRow = document.createElement('tr');
            secondRow.appendChild(document.createElement('td').appendChild(cstmFilterDiv));

            table.appendChild(secondRow);
        }

        // Set filter div font
        var downloadFilterDiv = document.createElement('div');
        downloadFilterDiv.id = DOWNLOAD_FILTER_DIV_ID;
        downloadFilterDiv.style.font = TEXT_FONT_SIZE + " " + TEXT_FONT_TYPE;
        downloadFilterDiv.appendChild(table);

        parentElem.appendChild(downloadFilterDiv);

    } catch (e) { alertExceptionDetails(e); }
}
