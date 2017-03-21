/**
 * Created by rafael on 21/03/17.
 */

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