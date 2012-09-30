// ################################################
// ###### FOR INTELLISENSE
// ######
/// <reference path="utils.js" />
// ################################################


///////////////////////////////////////////////////////////
// Contructor
///////////////////////////////////////////////////////////
function LinksStorage() {
    this.ext2ids = new Array();
    this.id2link = new Array();
    this.id2Name = new Array();
    this.id = 0;    
}

///////////////////////////////////////////////////////////
// Add name to link id 
///////////////////////////////////////////////////////////
LinksStorage.prototype.addName = function (id, name) {
    this.id2Name[id] = name;
}

///////////////////////////////////////////////////////////
// Add link (filter and sort)
///////////////////////////////////////////////////////////
LinksStorage.prototype.addLink = function (link) {
    try {

        // Validate extension
        var extension = getExtensionFromPath(link);
        if (this.isExtensionLegal(extension) == false) {
            extension = "unknown";
        }

        // Create ids array for extension
        if (typeof this.ext2ids[extension] == 'undefined') {
            this.ext2ids[extension] = new Array();
        }

        // Check if link exists
        for (var i = 0; i < this.ext2ids[extension].length; ++i) {
            if (this.id2link[this.ext2ids[extension][i]] == link) {
                return;
            }
        }

        // Create unique id
        this.id++;

        // Push to DB
        this.ext2ids[extension].push(this.id);
        this.id2link[this.id] = link;

        return this.id;

    } catch (e) { alertExceptionDetails(e); }
}

///////////////////////////////////////////////////////////
// Return Array<id,link>
///////////////////////////////////////////////////////////
LinksStorage.prototype.getAllLinks = function () {
    try {        
        var allLinks = new Array();

        var extArr = this.getExtensions();
        for (var i = 0; i < extArr.length; ++i) {
            var idArr = this.ext2ids[extArr[i]];            
            for (var j = 0; j < idArr.length; ++j) {
                allLinks[idArr[j]] = this.id2link[idArr[j]];                
            }
        }

        return allLinks;
    }
    catch (exc) {
        alertExceptionDetails(exc);
    }
}

///////////////////////////////////////////////////////////
// Return Array<id,link>
///////////////////////////////////////////////////////////
LinksStorage.prototype.getAllIds = function () {
    try {
        var allIds = new Array();

        var extArr = this.getExtensions();
        for (var i = 0; i < extArr.length; ++i) {
            var idArr = this.ext2ids[extArr[i]];
            for (var j = 0; j < idArr.length; ++j) {
                allIds.push(idArr[j]);
            }
        }

        return allIds;
    }
    catch (exc) {
        alertExceptionDetails(exc);
    } 
}

///////////////////////////////////////////////////////////
// Return Array<extensions>
///////////////////////////////////////////////////////////
LinksStorage.prototype.getExtensions = function () {
    var extArr = new Array();

    for (var extension in this.ext2ids) {        
        extArr.push(extension);
    }

    return extArr;
}

///////////////////////////////////////////////////////////
// Return Array<id,link>
///////////////////////////////////////////////////////////
LinksStorage.prototype.getIds = function (extension) {
    return this.ext2ids[extension];    
}

///////////////////////////////////////////////////////////
// Return link
///////////////////////////////////////////////////////////
LinksStorage.prototype.getLink = function (id) {
    return this.id2link[id];
}

///////////////////////////////////////////////////////////
// Return true if given string is valid file extension
///////////////////////////////////////////////////////////
LinksStorage.prototype.isExtensionLegal = function (extension) {    
    if ((extension.length == 4 || extension.length == 3) && /[a-z,0-9]{3,4}$/i.test(extension)) {
        return true;
    }
    return false;
}
