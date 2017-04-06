/**
 * Created by rmtel on 22/03/2017.
 */

(function (exports) {

    "use strict";

    var module = {
        sendTroops: sendTroops
    };
    $.extend(exports, module);

    function sendTroops(troops) {
        $("#unit_input_spear").val(troops.spearFighter || "");
        $("#unit_input_sword").val(troops.swordsman || "");
        $("#unit_input_axe").val(troops.axeman || "");
        // $("#unit_input_spear").val(troops.archer || ""); //todo missing
        $("#unit_input_spy").val(troops.scout || "");
        $("#unit_input_light").val(troops.lightCavalary || "");
        // $("#unit_input_spear").val(troops.mounterArcher || "");
        $("#unit_input_ram").val(troops.heavyCavalary || ""); //todo missing
        $("#unit_input_spear").val(troops.ram || "");
        $("#unit_input_catapult").val(troops.catapult || "");
        $("#unit_input_knight").val(troops.paladin || "");
        $("#unit_input_snob").val(troops.nobleman || "");

        // $("#target_attack").click();
        var button = document.getElementById('target_attack');

        var evObj = document.createEvent('Events');
        evObj.initEvent("click", true, false);
        button.dispatchEvent(evObj);
    }

})(module.exports);