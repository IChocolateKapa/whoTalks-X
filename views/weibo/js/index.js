/**
 * Created by Echo on 2016/4/6.
 */

$(function () {
    $(".comment").on('touchend', function () {
        var $this = $(this),
            $cmtPanel = $this.parent().siblings('.commentPanel');
        /*ģ���ȡ���ݵĹ���*/
        var flag = Math.floor(Math.random()*1000) % 2;
        if (flag == 0) {
            /*������*/
        } else {
            /*û������*/

        }
    })
});