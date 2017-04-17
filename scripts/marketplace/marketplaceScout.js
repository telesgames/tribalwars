/**
 * Created by Rafael Teles <rmtelesgames@gmail.com> on 24-Feb-17.
 */
(function () {
    "use strict";

    var marketPlacePremiumExchange = require("../../common/marketplace/marketplacePremiumExchange.js");

    var threshold = {};

    (function _setThresholds() {
        var customThresholds = prompt("${marketplaceScout.customThreshold}", "500; 500; 500; 200; 200; 200").split(";");

        threshold = {
            buy: {
                wood: Number(customThresholds[0]),
                stone: Number(customThresholds[1]),
                iron: Number(customThresholds[2])
            },
            sell: {
                wood: Number(customThresholds[3]),
                stone: Number(customThresholds[4]),
                iron: Number(customThresholds[5])
            }
        };
    })();

    var $content = $("#premium_exchange_form");
    var lastRates = marketPlacePremiumExchange.getRates();
    var rates = [lastRates];
    analyseResources(rates[0]);

    function checkRates() {
        var currentRates = marketPlacePremiumExchange.getRates();
        analyseResources(currentRates);

        if (currentRates.wood !== lastRates.wood
            || currentRates.stone !== lastRates.stone
            || currentRates.iron !== lastRates.iron) {

            lastRates = currentRates;
            rates.push(currentRates);
            console.log(currentRates);
        }
    }

    function analyseResources(currentRates) {
        if (currentRates.wood < threshold.sell.wood || currentRates.stone < threshold.sell.stone || currentRates.iron < threshold.sell.iron) {
            $(document).attr("title", "VENDER");
        } else if (currentRates.wood > threshold.buy.wood || currentRates.stone > threshold.buy.stone || currentRates.iron > threshold.buy.iron) {
            $(document).attr("title", "COMPRAR");
        } else {
            $(document).attr("title", ".................................");
        }

        var DEFAULT_COLOR = "#f4e4bc";
        if (currentRates.wood < threshold.sell.wood) {
            $content.find("table tr td:nth-child(2)").css("background-color", "#ff4444");
        } else if (currentRates.wood > threshold.buy.wood) {
            $content.find("table tr td:nth-child(2)").css("background-color", "#6d6dff");
        } else {
            $content.find("table tr td:nth-child(2)").css("background-color", DEFAULT_COLOR);
        }

        if (currentRates.stone < threshold.sell.stone) {
            $content.find("table tr td:nth-child(3)").css("background-color", "#ff4444");
        } else if (currentRates.stone > threshold.buy.stone) {
            $content.find("table tr td:nth-child(3)").css("background-color", "#6d6dff");
        } else {
            $content.find("table tr td:nth-child(3)").css("background-color", DEFAULT_COLOR);
        }

        if (currentRates.iron < threshold.sell.iron) {
            $content.find("table tr td:nth-child(4)").css("background-color", "#ff4444");
        } else if (currentRates.iron > threshold.buy.iron) {
            $content.find("table tr td:nth-child(4)").css("background-color", "#6d6dff");
        } else {
            $content.find("table tr td:nth-child(4)").css("background-color", DEFAULT_COLOR);
        }

    }

    setInterval(checkRates, 1000);

})();