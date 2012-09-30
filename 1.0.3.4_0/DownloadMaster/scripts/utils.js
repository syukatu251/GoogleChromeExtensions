///////////////////////////////////////////////////////////
// Given exception object, alert all it's details
///////////////////////////////////////////////////////////
function alertExceptionDetails(exc) {   
//    alert(
//        "Exception:\n" +
//        exc + " \n " +
//        exc.InnerException + " \n " +
//        exc.Source + " \n " +
//        exc.StackTrace + " \n " +
//        exc.Line + " \n " +
//        exc.SourceItem + " \n " +
//        exc.Column + " \n " +
//        exc.Data + " \n " +
//        exc.Description + " \n " +
//        exc.EndColumn + " \n " +
//        exc.EndLine + " \n " +
//        exc.ErrorNumber + " \n " +
//        exc.HelpLink + " \n " +
//        exc.GetBaseException + " \n " +
//        exc.GetObjectData + " \n " +
//        exc.GetType + " \n " +
//        exc.LineText + " \n " +
//        exc.Number + " \n " +
//        exc.Message + " \n " +
//        exc.SourceMoniker + " \n " +
//        exc.StartColumn + " \n " +
//        exc.TargetSite + " \n " +
//        exc.Severity);
}

///////////////////////////////////////////////////////////
// Given file path, return it's name
///////////////////////////////////////////////////////////
function getFileName(filePath) {
    try {

        var fileName = "";
        var lastSlashIndex = -1;

        if (typeof filePath != 'undefined' && filePath.length > 0) {
            lastSlashIndex = filePath.lastIndexOf("/");
        }
        if (lastSlashIndex > -1) {
            fileName = filePath.substr(lastSlashIndex + 1, filePath.length - lastSlashIndex - 1);
        }
    
        return fileName;

    } catch (e) {alertExceptionDetails(e);}
}

///////////////////////////////////////////////////////////
// Given file name, return it's extension
///////////////////////////////////////////////////////////
function getExtensionFromName(fileName) {

    try {

        var fileExt = "";
        var lastDotIndex = -1;

        if (typeof fileName != 'undefined' && fileName.length > 0) {
            lastDotIndex = fileName.lastIndexOf(".");
        }
        if (lastDotIndex > -1) {
            fileExt = fileName.substr(lastDotIndex + 1, fileName.length - lastDotIndex - 1);
        }

        return fileExt.toLowerCase();
    } catch (e) { alertExceptionDetails(e); }
}

///////////////////////////////////////////////////////////
// Given file path, return it's extension
///////////////////////////////////////////////////////////
function getExtensionFromPath(filePath) {
    return getExtensionFromName(getFileName(filePath));
}