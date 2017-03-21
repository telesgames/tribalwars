(function () {}()); try { (function () {
    var $villages = $("#villages");
    if ($villages.find("tr td:first-child").length == 0) {
        throw "Nenhuma coordenada foi encontrada."
    }
    var result = "";
    $villages.find("tr td:first-child").each(function () {
        var split = $(this).text().split(" ");
        var coordinates = split[split.length - 2]
            .replace("(", "")
            .replace(")", "");
        result += " " + coordinates;
    });
    prompt("Copiar coordenadas: Ctrl+C, Enter", result);
})(); } catch(e) { console.error(e);alert(e); };