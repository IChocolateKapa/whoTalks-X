/**
 * Created by Echo on 2016/4/6.
 */

$(function () {
    $(".comment").on('touchend', function () {
        var $this = $(this),
            $cmtPanel = $this.parent().siblings('.commentPanel');

        /*<div class="commentItem">
            <img class="headimg" src="img/myhead/3.jpg" alt="头像"/>
            <div class="dongtan-content">
                <p class="author">_哈哈哈</p>
                <p class="tip"><span>2016.03.06  15:23:34</span></p>
                <p class="content">
                    真的假的啊？看起来平时人还不错啊？求真相~
                </p>
            </div>
            <div class="like"></div>
        </div>*/
        /*模拟获取数据的过程*/
        var flag = Math.floor(Math.random()*1000) % 2;
        if (flag == 0) {
            /*有数据*/
        } else {
            /*没有数据*/

        }
    })
});