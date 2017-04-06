/**
 * Created by rafael on 22/03/17.
 */
(function () {
    "use strict";

    var lootAssistant = require("../../common/lootAssistant/lootAssistant.js");
    var lootAssistantCustomTroops = require("../../common/lootAssistant/lootAssistantCustomTroops.js");

    var models = [
        {
            axeman: 15,
            scout: 1,
            ram: 3
        }, {
            axeman: 15,
            scout: 1,
            ram: 4
        }, {
            axeman: 30,
            scout: 1,
            ram: 8
        }, {
            axeman: 80,
            scout: 1,
            ram: 12
        }
    ];
    var defaultModel = models[1];

    var count = 0;
    var troops = {};
    function run() {
        if (count === lootAssistant.rows.length) {
            return;
        }

        var row = lootAssistant.rows[count++];
        var wall = row.wall;
        console.debug(wall);
        if (Number.isNaN(wall)) {
            row.openCustomTroops();
            troops = defaultModel;

            setTimeout(_send, 3000 + Math.random() * 100)
        } else if (wall >= 1 && wall <= 4) {
            row.openCustomTroops();
            troops = models[wall];

            setTimeout(_send, 3000 + Math.random() * 100)
        } else {
            run();
        }
    }
    run();


    function _send() {
        lootAssistantCustomTroops.sendTroops(troops);

        setTimeout(run, 3000 + Math.random() * 100)
    }
})();