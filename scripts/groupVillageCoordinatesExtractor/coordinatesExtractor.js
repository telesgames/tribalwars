/**
 * Created by Rafael Teles <rmtelesgames@gmail.com> on 20-Feb-17.
 */
(function () {

    var $villages = $("#villages");
    if ($villages.find("tr td:first-child").length == 0) {
        throw "${groupVillageCoordinatesExtractor.noCoordinateFound}"
    }

    var result = "";
    $villages.find("tr td:first-child").each(function () {
        var split = $(this).text().split(" ");
        var coordinates = split[split.length - 2]
            .replace("(", "")
            .replace(")", "");

        result += " " + coordinates;
    });

    prompt("${groupVillageCoordinatesExtractor.copyCoordinates}", result);

})();