/// <reference path="../../libs/jquery-1.8.1.js" />


var CstImageData = Object.create({}, {
    "initialize": {
        value: function () {
            $('img[src="http://ehgt.org/g/imgicon.png"]').mouseover().mouseout();
        }
    },
    "jq": {
        get: function () {
            $('img[src="http://ehgt.org/g/imgicon.png"]').mouseover().mouseout();

            var jqImg = $('div.it2 > img').clone();
            return $('div.it1').find('a:first').clone().each(function (out_index, out_a) {
                $(out_a).find('img').remove();
                $(out_a).append(jqImg.eq(out_index));
            });
        }
    }
});