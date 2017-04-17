/**
 * Created by Rafael Teles <rmtelesgames@gmail.com> on 24-Feb-17.
 */
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