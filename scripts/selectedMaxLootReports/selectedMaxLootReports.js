/**
 * Created by Rafael Teles <rmtelesgames@gmail.com> on 20-Feb-17.
 */
(function () {

    "use strict";

    var IMG_HREF = "https://dsbr.innogamescdn.com/8.73/32299/graphic/max_loot/1.png";

    $("[src='" + IMG_HREF + "']").each(function () {
        var $this = $(this);

        var tr = $this.closest("tr");
        $(tr).find("td:first-child input").click();
    });

})();