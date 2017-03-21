(function () {}()); try { (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (exports) {
    "use strict";
    var transactionsHandler = require("./marketplacePremiumTransactions.js");
    var module = {
        getStock: getStock,
        getCapacity: getCapacity,
        getRates: getRates,
        buyWood: buyWood,
        buyStone: buyStone,
        buyIron: buyIron,
        sellWood: sellWood,
        sellStone: sellStone,
        sellIron: sellIron,
        executeSafeExchange: executeSafeExchange,
        $btnCalculateExchange: $(".btn-premium-exchange-buy")
    };
    $.extend(exports, module);
    var $form = $("#premium_exchange_form"),
        WOOD = "wood",
        STONE = "stone",
        IRON = "iron";
    function getStock() {
        return _buildResource(
            $("#premium_exchange_stock_" + WOOD).text(),
            $("#premium_exchange_stock_" + STONE).text(),
            $("#premium_exchange_stock_" + IRON).text())
    }
    function getCapacity() {
        return _buildResource(
            $("#premium_exchange_capacity_" + WOOD).text(),
            $("#premium_exchange_capacity_" + STONE).text(),
            $("#premium_exchange_capacity_" + IRON).text())
    }
    function getRates() {
        return _buildResource(
            $("#premium_exchange_rate_" + WOOD + " div:first-child").text(),
            $("#premium_exchange_rate_" + STONE + " div:first-child").text(),
            $("#premium_exchange_rate_" + IRON + " div:first-child").text())
    }
    function _buildResource(wood, stone, iron) {
        return {
            wood: Number(wood),
            stone: Number(stone),
            iron: Number(iron)
        }
    }
    function buyWood(amount) {
        $("#premium_exchange_buy_wood input").val(amount);
        setTimeout(function () {
            _executePurchase("wood", getRates().wood * 0.85);
        }, 200);
    }
    function buyStone(amount) {
        $("#premium_exchange_buy_stone input").val(amount);
        setTimeout(function () {
            _executePurchase("stone", getRates().stone * 0.85);
        }, 200);
    }
    function buyIron(amount) {
        $("#premium_exchange_buy_iron input").val(amount);
        setTimeout(function () {
            _executePurchase("iron", getRates().iron * 0.85);
        }, 200);
    }
    function _executePurchase(resource, minRate) {
        $form.submit();
        setTimeout(function () {
            var split = $("#premium_exchange table tr:nth-child(2) td:nth-child(2)").text().split(" ");
            var pps = Number(split[5]);
            var finalAmount = Number(split[2]);
            var finalRate = finalAmount / pps;
            if (finalAmount < minRate) {
                console.warn("FinalRate is too low (" + finalRate + ")");
                return;
            }
            console.log(resource + " - " + " bought " + finalAmount + " | rate = " + finalRate + " | pp = " + pps);
            $(".btn-confirm-yes").click();
            transactionsHandler.addTransaction(resource, finalAmount, -pps);
        }, 200)
    }
    function sellWood(amount) {
        $("#premium_exchange_sell_wood input").val(amount);
        setTimeout(function () {
            _sell(amount, "wood", sellWood, getRates().wood * 1.25);
        }, 200);
    }
    function sellStone(amount) {
        $("#premium_exchange_sell_stone input").val(amount);
        setTimeout(function () {
            _sell(amount, "stone", sellStone, getRates().stone * 1.25);
        }, 200);
    }
    function sellIron(amount) {
        $("#premium_exchange_sell_iron input").val(amount);
        setTimeout(function () {
            _sell(amount, "iron", sellIron, getRates().iron * 1.25);
        }, 200);
    }
    function _sell(amount, resource, sellMethod, maxRate) {
        var maxAmount;
        if (amount % 1000 == 0) {
            maxAmount = amount;
        } else {
            maxAmount = amount + (1000 - amount % 1000);
        }
        $form.submit();
        setTimeout(function () {
            var split = $("#premium_exchange table tr:nth-child(2) td:nth-child(2)").text().split(" ");
            var pps = Number(split[5]);
            var finalAmount = Number(split[2]);
            var finalRate = finalAmount / pps;
            if (finalRate > maxRate) {
                console.warn("FinalRate is too high (" + finalRate + ")");
                return;
            }
            if (finalAmount > maxAmount) {
                $(".btn-confirm-no").click();
                setTimeout(function () {
                    console.log("Trying new value to sell");
                    sellMethod(amount - finalRate);
                }, 500);
            } else {
                console.log(resource + " - " + " sold " + finalAmount + " | rate = " + finalRate + " | pp = " + pps);
                $(".btn-confirm-yes").click();
                transactionsHandler.addTransaction(resource, -finalAmount, pps);
            }
        }, 200)
    }
    function executeSafeExchange() {
        if ($("#premium_exchange_sell_wood input").val()) {
            sellWood(Number($("#premium_exchange_sell_wood input").val()));
        }
        if ($("#premium_exchange_sell_stone input").val()) {
            sellStone(Number($("#premium_exchange_sell_stone input").val()));
        }
        if ($("#premium_exchange_sell_iron input").val()) {
            sellIron(Number($("#premium_exchange_sell_iron input").val()));
        }
        if ($("#premium_exchange_buy_wood input").val()) {
            buyWood(Number($("#premium_exchange_buy_wood input").val()));
        }
        if ($("#premium_exchange_buy_stone input").val()) {
            buyStone(Number($("#premium_exchange_buy_stone input").val()));
        }
        if ($("#premium_exchange_buy_iron input").val()) {
            buyIron(Number($("#premium_exchange_buy_iron input").val()));
        }
    }
})(module.exports);
},{"./marketplacePremiumTransactions.js":2}],2:[function(require,module,exports){
(function (exports) {
    "use strict";
    $.extend(exports, {
        getTransactions: getTransactions,
        addTransaction: addTransaction,
        clear: clear
    });
    var KEY = "marketplacePremiumExchange",
        transactions = [];
    function _init() {
        _loadTransaction();
    }
    function getTransactions() {
        return transactions;
    }
    function addTransaction(resource, amount, pps) {
        transactions.push({resource: resource, amount: amount, pps: pps});
        _saveTransactions();
    }
    function clear() {
        localStorage.setItem(KEY, "");
    }
    function _loadTransaction() {
        var result = localStorage.getItem(KEY);
        if (result) {
            transactions = JSON.parse(result);
        } else {
            transactions = [];
        }
    }
    function _saveTransactions() {
        localStorage.setItem(KEY, JSON.stringify(transactions));
    }
    _init();
})(module.exports);
},{}],3:[function(require,module,exports){
(function () {
    "use strict";
    var marketPlacePremiumExchange = require("../../common/marketplace/marketplacePremiumExchange.js");
    var threshold = {};
    (function _setThresholds() {
        var customThresholds = prompt("buy: wood;stone;iron - sell: wood;stone;iron", "500; 500; 500; 200; 200; 200").split(";");
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
},{"../../common/marketplace/marketplacePremiumExchange.js":1}]},{},[3]) } catch(e) { console.error(e);alert(e); };