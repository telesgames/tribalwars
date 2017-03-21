/**
 * Created by Rafael Teles <rmteles@translucentcomputing.com> on 24-Feb-17.
 */
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