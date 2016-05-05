/**
 * Created by Echo on 16/3/24.
 */

define(['jquery', 'util'], function ($, util) {
    var $sideBar = $(".sideBar"),
        $main = $(".main");

    /*点击汉堡按钮*/
    $(".ham").click(function (evt) {
        //$(window).trigger('resize');
        util.toggleClass($sideBar, 'small');
        util.toggleClass($main, 'expand');
        evt.stopPropagation();
    });


    require(['niceScroll'], function () {
        $('body').niceScroll({
            cursorcolor:"#080C17",
            cursorborder: '1px solid #080C17',
            zIndex:3
        });
    });

    /*点击一级菜单时相应的二级菜单要展开或收起*/
    $(".systemItem a.fir").click(function (evt) {
        var $this = $(this);
        $(".systemItem a.fir").removeClass('active');
        $this.addClass('active');
        if ($this.hasClass('open')) {
            $this.removeClass('open');
            $this.siblings('.sec').slideUp();
        } else {
            $this.addClass('open');
            $this.siblings('.sec').slideDown();
        }
        evt.stopPropagation();
    });
    /*点击左侧菜单,相应加载不同的页面*/
    $(".systemItem a.sec").click(function (evt) {
        var $this = $(this),
            firDir = $this.prevAll('.fir').attr('data-first');
            page = firDir + '/' + $this.attr('data-second');
        $(".systemItem a.sec").removeClass('active');
        $this.addClass('active');

        var pagejs = '../templates/' + page + '/index';
        require([pagejs], function (render) {
            render.initHtml(page);
        });
        evt.stopPropagation();
    });

    /*监听回到顶部按钮是否出现*/
    $(window).on("scroll", function() {

        var scrollTop = $(window).scrollTop();
        /*控制显示返回顶部图标*/
        if (scrollTop > 500) {
            $(".top").show();
        } else {
            $(".top").hide();
        }
    });

    /*点击返回顶部*/
    $(".top").click(function (evt) {
        $("html, body").animate({scrollTop: 0}, 500);
        evt.stopPropagation();
    });

})