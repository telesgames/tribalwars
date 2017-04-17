/**
 * Created by Rafael Teles <rmtelesgames@gmail.com> on 20-Feb-17.
 */
(function (exports) {
    "use strict";

    var module = {
        getScoutedResources: getScoutedResources
    };
    $.extend(exports, module);
    
    function getScoutedResources() {
        if (!$("#attack_spy_resources .icon.header.wood")) {
            throw "${reportDiscoveredResourcesTroopsCalculator.resourcesNotFound}";
        }

        return {
            wood: getResource("#attack_spy_resources .icon.header.wood"),
            stone: getResource("#attack_spy_resources .icon.header.stone"),
            iron: getResource("#attack_spy_resources .icon.header.iron")
        }
    }

    function getResource(cssSelector) {
        var resourceTxt = $($(cssSelector)[0]).parent().text();
        resourceTxt = resourceTxt.replace(".", "");
        return Number(resourceTxt);
    }

})(module.exports);