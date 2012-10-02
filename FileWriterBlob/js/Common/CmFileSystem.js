/// <reference path="../libs/jquery-1.8.1.js" />

var CmDirectory = function (in_strPath, in_size) {
    this.dfdDirectory = CmFileSystem.request(TEMPORARY, in_size).pipe(function (out_fileSystem) {
        return CmFileSystem.getDirectory(out_fileSystem, in_strPath, { create: true });
    });
};

CmDirectory.prototype.saveBlob = function (in_blob, in_strFileName) {
    this.dfdDirectory.pipe(function (out_directory) {
        return CmFileSystem.getFile(out_directory, in_strFileName, { create: true });
    }).pipe(function (out_file) {
        return CmFileSystem.createWriter(out_file);
    }).done(function (out_fileWriter) {
        out_fileWriter.write(in_blob);
    }).fail(function (e) {
        console.log(e);
    });
};

var CmFileSystem = Object.create({}, {
    "request": {
        value: function (type, size) {
            var dfdFileSystem = $.Deferred();
            webkitRequestFileSystem(type, size, function (fileSystem) {
                dfdFileSystem.resolve(fileSystem);
            }, function (fileError) {
                dfdFileSystem.reject(fileError);
            });

            return dfdFileSystem.promise();
        }
    },

    "getDirectory": {
        value: function (fileSystem, path, options) {
            var dfdDirectory = $.Deferred();
            fileSystem.root.getDirectory(path, options, function (directory) {
                dfdDirectory.resolve(directory);
            }, function (e) {
                dfdDirectory.reject(e);
            });

            return dfdDirectory.promise();
        }
    },

    "getFile": {
        value: function (directory, path, options) {
            var dfdFile = $.Deferred();
            directory.getFile(path, options, function (file) {
                dfdFile.resolve(file);
            }, function (e) {
                dfdFile.reject(e);
            });

            return dfdFile.promise();
        }
    },

    "createWriter": {
        value: function (file) {
            var dfdFileWriter = $.Deferred();
            file.createWriter(function (fileWriter) {
                dfdFileWriter.resolve(fileWriter);
            }, function (e) {
                dfdFileWriter.reject(e);
            });
            return dfdFileWriter.promise();
        }
    }
});