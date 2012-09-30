var BgLocalDirectory = Object.create({}, {
    "ScriptPath": {
        value: "\"C:/Users/lliquid/Documents/GitHub/ruby/PicturesDirectory.rb\""
    },
    "saveImage": {
        value: function (in_strTitle, in_strImageUrl) {
            var plugin = document.getElementById("idPlugin");
            var strCommand = "ruby " + this.ScriptPath + " saveImage \"" + in_strTitle + "\" " + in_strImageUrl;
            console.log(strCommand.length);
            plugin.createProcess(strCommand);
        }
    }
});