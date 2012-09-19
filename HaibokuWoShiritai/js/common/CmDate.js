var CmDate = Object.create({}, {
    strNow: {
        get: function () {
            var dateNow = new Date();
            var strNow = "";
            var month = dateNow.getMonth() + 1;
            strNow += dateNow.getFullYear() + "/" + month + "/" + dateNow.getDate() + " ";
            strNow += dateNow.getHours() + ":" + dateNow.getMinutes();

            return strNow;
        }
    }
});