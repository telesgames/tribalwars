/**
 * Created by Rafael Teles <rmtelesgames@gmail.com> on 24-Feb-17.
 */
(function () {
    "use strict";

    var transactionsHandler = require("../../common/marketplace/marketplacePremiumTransactions.js");

    var transactions = transactionsHandler.getTransactions();
    var result = {
        wood: {resources: 0, pps: 0},
        stone: {resources: 0, pps: 0},
        iron: {resources: 0, pps: 0}
    };

    transactions.forEach(function (transaction) {
        var type = result[transaction.resource];
        type.resources += transaction.amount;
        type.pps += transaction.pps;
    });

    prompt("copy",
        "wood:" + result.wood.resources + ";" + result.wood.pps + " " +
        "stone:" + result.stone.resources + ";" + result.stone.pps + " " +
        "iron:" + result.iron.resources + ";" + result.iron.pps
    );

    if (prompt("clear? 'yes' or 'no'", "no") === "yes") {
        transactionsHandler.clear();
    }
})();