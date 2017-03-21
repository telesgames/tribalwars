/**
 * Created by rafael on 21/03/17.
 */
(function () {

    "use strict";

    var from = Number(localStorage.getItem("sendTroops.from")) || 5,
        to = Number(localStorage.getItem("sendTroops.to")) || 30,
        type = Number(localStorage.getItem("sendTroops.type")) || "b";

    localStorage.setItem("sendTroops.from", prompt("From:", from));
    localStorage.setItem("sendTroops.to", prompt("To:", to));
    localStorage.setItem("sendTroops.type", prompt("Type (a | b | c):", type));


})();