/**
 * Created by Echo on 2016/4/6.
 */

$(function () {
    $(".comment").on('touchend', function () {
        var $this = $(this),
            $cmtPanel = $this.parent().siblings('.commentPanel');

        /*<div class="commentItem">
            <img class="headimg" src="img/myhead/3.jpg" alt="ͷ��"/>
            <div class="dongtan-content">
                <p class="author">_������</p>
                <p class="tip"><span>2016.03.06  15:23:34</span></p>
                <p class="content">
                    ��ļٵİ���������ƽʱ�˻�������������~
                </p>
            </div>
            <div class="like"></div>
        </div>*/
        /*ģ���ȡ���ݵĹ���*/
        var flag = Math.floor(Math.random()*1000) % 2;
        if (flag == 0) {
            /*������*/
        } else {
            /*û������*/

        }
    })
});