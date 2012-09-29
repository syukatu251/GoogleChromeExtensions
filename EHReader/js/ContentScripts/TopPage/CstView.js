/// <reference path="../../libs/jquery-1.8.1.js" />


var CstView = Object.create({}, {
    "initialize": {
        value: function () {
            var jqDivStartAndEnd = $("<div>").addClass("csButtonDiv");
            jqDivStartAndEnd.append($("<button>").text("start").attr("id", "csStartButton"));
            jqDivStartAndEnd.append($("<button>").text("end").attr("id", "csEndButton"));
            $("body").append(jqDivStartAndEnd).prepend($("<div>").addClass("csImageViewDiv"));

            this.onClickEndButton(function () {
                $("div.csImageViewDiv").empty();
            });
        }
    },

    "onClickStartButton": {
        value: function (in_func) {
            $("#csStartButton").click(function () {
                in_func();
            });
        }
    },

    "onClickEndButton": {
        value: function (in_func) {
            $("#csEndButton").click(function () {
                in_func();
            });
        }
    },

    "jqImage": {
        set: function (in_jqImage) {
            $("div.csImageViewDiv").empty();
            $("div.csImageViewDiv").append(in_jqImage);
        }
    }
});