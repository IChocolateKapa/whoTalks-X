/**
 * Created by Echo on 2016/4/6.
 */

$(function () {
    $(".comment").on('touchend', function () {
        var $this = $(this),
            $cmtPanel = $this.parent().siblings('.commentPanel');
        /*模拟获取数据的过程*/
        var flag = Math.floor(Math.random()*1000) % 2;
        if (flag == 0) {
            /*有数据*/
        } else {
            /*没有数据*/

        }
    })
});