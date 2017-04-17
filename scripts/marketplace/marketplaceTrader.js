/**
 * Created by Rafael Teles <rmtelesgames@gmail.com> on 24-Feb-17.
 */
(function () {
    "use strict";

    var marketPlacePremiumExchange = require("../../common/marketplace/marketplacePremiumExchange.js");

    marketPlacePremiumExchange.$btnCalculateExchange.replaceWith(
        $("<input>", {
            type: "button",
            class: "btn float_right btn-premium-exchange-buy",
            style: "margin-top: 10px; margin-bottom: 10px;",
            value: "${marketplaceTrader.submitButton}"
        })
            .click(marketPlacePremiumExchange.executeSafeExchange)
    );

})();