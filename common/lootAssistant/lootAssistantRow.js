/**
 * Created by rafael on 21/03/17.
 */

(function (exports) {

    "use strict";

    var LootAssistantRowStatus = {
        VICTORY: "VICTORY",
        PARTIAL_LOSS: "PARTIAL_LOSS",
        LOSS: "LOSS"
    };

    var module = {
        LootAssistantRowStatus: LootAssistantRowStatus,
        LootAssistantRow: LootAssistantRow
    };
    $.extend(exports, module);
    
    function LootAssistantRow ($tr) {
        var $tds = $tr.find("td");
        for (var i = 0; i < $tds.length; i++) {
            $tds[i] = $($tds[i]);
        }

        this.hide = hide;
        this.removeReports = removeReports;
        this.status = _getStatus($tds[1]);
        this.maxLoot = _isMaxLoot($tds[2]);
        this.coordinates = _getCoordinates($tds[3]);
        this.date = $tds[4].text();
        //todo missing resources
        this.wall = Number($tds[6].text());
        this.distance = Number($tds[7].text());
        this.sendA = sendA;
        this.sendB = sendB;
        this.sendC = sendC;

        function removeReports() {
            $($tds[0].find("a")).click();
        }

        function hide() {
            $tr.hide();
        }

        function sendA() {
            $tds[8].find("a").click();
        }

        function sendB() {
            $tds[9].find("a").click();
        }

        function sendC() {
            $tds[10].find("a").click();
        }
    };

    function _getStatus($td) {
        var src = $td.find("img").attr("src");

        if (src.match("green")) {
            return LootAssistantRowStatus.VICTORY
        } else if (src.match("yellow")) {
            return LootAssistantRowStatus.PARTIAL_LOSS
        } else {
            return LootAssistantRowStatus.LOSS;
        }
    }

    function _isMaxLoot($td) {
        var src = $td.find("img").attr("src");

        return src && src.match("1.png");
    }

    function _getCoordinates($td) {
        var text = $td.find("a").text();

        return text.substring(1, 8);
    }

})(module.exports);