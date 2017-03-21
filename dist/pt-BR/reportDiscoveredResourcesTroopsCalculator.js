(function () {}()); try { (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (exports) {
    "use strict";
    var module = {
        getScoutedResources: getScoutedResources
    };
    $.extend(exports, module);
        function getScoutedResources() {
        if (!$("#attack_spy_resources .icon.header.wood")) {
            throw "Nenhum recurso encontrado.";
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
},{}],2:[function(require,module,exports){
(function (exports) {
    "use strict";
    exports.unity = {
        spearFighter: {
            name: "lanceiro",
            haul: 25
        },
        swordsman: {
            name: "espadachim",
            haul: 15
        },
        axeman: {
            name: "barbaro",
            haul: 10
        },
        archer: {
            name: "arqueiro",
            haul: 10
        },
        scout: {
            name: "explorador",
            haul: 0
        },
        lightCavalary: {
            name: "cavalaria leve",
            haul: 80
        },
        mounterArcher: {
            name: "arqueiro a cavalo",
            haul: 50
        },
        heavyCavalary: {
            name: "cavalaria pesada",
            haul: 50
        },
        ram: {
            name: "ariete",
            haul: 0
        },
        catapult: {
            name: "catapulta",
            haul: 0
        },
        paladin: {
            name: "paladino",
            haul: 100
        },
        nobleman: {
            name: "nobre",
            haul: 0
        },
        militia: {
            name: "milicia",
            haul: 0
        }
    };
})(module.exports);
},{}],3:[function(require,module,exports){
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
},{"../../common/report/resourcesScouted.js":1,"../../common/unity.js":2}]},{},[3]) } catch(e) { console.error(e);alert(e); };