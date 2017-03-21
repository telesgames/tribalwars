(function () {}()); try { (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (exports) {
    "use strict";
    var module = {
        rows: [],
        hideCleanPlunders: hideCleanPlunders,
        hideEmptyWallVillages: hideEmptyWallVillages
    };
    $.extend(exports, module);
    var LootAssistantRow = require("./lootAssistantRow.js").LootAssistantRow;
    var LootAssistantRowStatus = require("./lootAssistantRow.js").LootAssistantRowStatus;
    var LIST_ID = "#plunder_list";
    function _init() {
        var trs = $(LIST_ID + " tr");
        for (var i = 1; i < trs.length; i++) {
            module.rows.push(new LootAssistantRow($(trs[i])));
        }
    }
    function hideCleanPlunders() {
        module.rows.filter(function (row) {
            return row.status === LootAssistantRowStatus.VICTORY;
        }).forEach(function (row) {
            row.hide();
        })
    }
    function hideEmptyWallVillages() {
        module.rows.filter(function (row) {
            return row.wall == 0 || Number.isNaN(row.wall);
        }).forEach(function (row) {
            row.hide();
        })
    }
    _init();
})(module.exports);
},{"./lootAssistantRow.js":2}],2:[function(require,module,exports){
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
        this.wall = Number($tds[6].text());
        this.distance = Number($tds[7].text());
        this.sendA = sendA;
        this.sendB = sendB;
        this.sendC = sendC;
        this.hasC = $tds[10].find("a").length > 0;
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
},{}],3:[function(require,module,exports){
(function () {
    "use strict";
    var lootAssistant = require("../../common/lootAssistant/lootAssistant.js");
    lootAssistant.hideCleanPlunders();
})();
},{"../../common/lootAssistant/lootAssistant.js":1}]},{},[3]) } catch(e) { console.error(e);alert(e); };