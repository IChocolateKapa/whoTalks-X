/**
 * Created by Echo on 2016/1/15.
 */
$(function () {
    $(".section").bind("touchstart", function () {
        $(this).addClass("highlight");
    });

    $(".section").bind("touchend", function () {
        $(".section").removeClass("highlight");
    });

});