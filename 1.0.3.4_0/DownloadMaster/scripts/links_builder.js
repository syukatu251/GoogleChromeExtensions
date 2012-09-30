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
/// Build links table
////////////////////////////////////////////////////////////////////
function buildLinksTable(parentElem) {
    try {

        // Get links list div
        var downloadListDiv = document.createElement('div');
        downloadListDiv.id = DOWNLOAD_LIST_DIV_ID;

        // Create links table        
        var table = document.createElement('table');
        table.id = LINKS_TABLE_ID;
        table.border = "0";
        table.style.font = TEXT_FONT_SIZE + " " + TEXT_FONT_TYPE;

        // Build links table        
        var allLinks = gLinksStorage.getAllLinks();
        for (var id in allLinks) {

            // Create check box and assign id
            var chkBox = document.createElement('input');
            chkBox.type = "checkbox";
            chkBox.id = id;
            chkBox.checked = false;
            chkBox.onclick = function () { onLinkCheck() };

            // Create row
            var row = document.createElement('tr');
            row.id = LINK_ROW_ELEM_ID_PREFIX + id;

            // Fill check box column
            var chkCol = document.createElement('td');
            chkCol.appendChild(chkBox);

            // Fill link column
            var linkCol = document.createElement('td');
            var displayText;

            if (gLinksStorage.id2Name[id] != undefined && $.trim(gLinksStorage.id2Name[id]) != "") {
                displayText = gLinksStorage.id2Name[id];
            }
            else {
                displayText = allLinks[id];
            }
            linkCol.appendChild(document.createTextNode(displayText));

            // Add column to the row
            row.appendChild(chkCol);
            row.appendChild(linkCol);

            // Add row to table
            table.appendChild(row);
        }

        
        downloadListDiv.appendChild(table);

        parentElem.appendChild(downloadListDiv);

    } catch (e) { alertExceptionDetails(e); }
}
