/**
 * Created by Rafael Teles <rmteles@translucentcomputing.com> on 20-Feb-17.
 */

(function () {
    "use strict";

    var Unity = require("../../common/unity.js").unity;
    var resourcesScouted = require("../../common/report/resourcesScouted.js");

    var scoutedResources = resourcesScouted.getScoutedResources();
    var total = scoutedResources.iron + scoutedResources.wood + scoutedResources.stone;

    var resultStr = "";
    for (var key in Unity) {
        if (Unity.hasOwnProperty(key) && Unity[key].haul > 0) {
            resultStr += Unity[key].name + " -> " + Math.ceil(total / Unity[key].haul) + "\n";
        }
    }

    alert(resultStr);

})();