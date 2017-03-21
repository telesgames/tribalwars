/**
 * Created by rafael on 21/03/17.
 */
(function () {

    "use strict";

    sessionStorage.setItem("sendTroops.from", prompt("From:", "5"));
    sessionStorage.setItem("sendTroops.to", prompt("To:", "30"));
    sessionStorage.setItem("sendTroops.type", prompt("Type (a | b | c):", "b"));


})();