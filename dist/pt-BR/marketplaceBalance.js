(function () {}()); try { (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{"../../common/marketplace/marketplacePremiumTransactions.js":1}]},{},[2]) } catch(e) { console.error(e);alert(e); };