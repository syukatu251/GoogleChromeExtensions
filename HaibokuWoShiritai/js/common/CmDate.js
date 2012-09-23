var CmDate = Object.create({}, {
    strNow: {
        get: function () {
            var dateNow = new Date();

            return this.toStr(dateNow);
        }
    },

    toStr: {
        value: function (in_date) {
            var strDate = "";
            var month = in_date.getMonth() + 1;
            strDate += in_date.getFullYear() + "/" + month + "/" + in_date.getDate() + " ";
            strDate += in_date.getHours() + ":" + in_date.getMinutes();

            return strDate;
        }
    }
});