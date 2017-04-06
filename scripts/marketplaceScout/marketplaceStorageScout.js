/**
 * Created by rmtel on 06/04/2017.
 */
(function () {
    "use strict";

    var marketPlacePremiumExchange = require("../../common/marketplace/marketplacePremiumExchange.js");

    var $content = $("#premium_exchange_form");

    function analyseResources() {
        var stock = marketPlacePremiumExchange.getStock();
        var rates = marketPlacePremiumExchange.getRates();

        if (stock.wood > rates.wood || stock.stone > rates.stone || stock.iron > rates.iron) {
            $(document).attr("title", "COMPRAR");
        } else {
            $(document).attr("title", ".................................");
        }

        var DEFAULT_COLOR = "#f4e4bc";
        if (stock.wood > rates.wood) {
            $content.find("table tr td:nth-child(2)").css("background-color", "#6d6dff");
        } else {
            $content.find("table tr td:nth-child(2)").css("background-color", DEFAULT_COLOR);
        }

        if (stock.stone > rates.stone) {
            $content.find("table tr td:nth-child(3)").css("background-color", "#6d6dff");
        } else {
            $content.find("table tr td:nth-child(3)").css("background-color", DEFAULT_COLOR);
        }

        if (stock.iron > rates.iron) {
            $content.find("table tr td:nth-child(4)").css("background-color", "#6d6dff");
        } else {
            $content.find("table tr td:nth-child(4)").css("background-color", DEFAULT_COLOR);
        }

    }

    analyseResources();
    setInterval(analyseResources, 1000);

})();