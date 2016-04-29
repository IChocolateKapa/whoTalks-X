/**
 * Created by Echo on 2016/4/28.
 */
$(function () {
    $(".echo-content-item-abc a").click(function () {
        var $this = $(this),
            $parContainer = $this.closest('.echo-content'),
            $siblingA = $parContainer.find('.echo-content-item-abc a');
        $siblingA.removeClass('active');
        $this.addClass('active');
    })
    $(".echo-content-item-citys span").click(function () {
        var $this = $(this),
            $parContainer = $this.closest('.echo-content'),
            $siblingSpan = $parContainer.find('.echo-content-item-container-content span');
            $content = $parContainer.find(".echo-content-item-container-content"),
            city = $this.html();
        if ($this.hasClass('active')) {
            $this.removeClass('active');
            $siblingSpan.each(function (index, ele) {
                if ($(ele).html() == city) {
                    $(ele).remove();
                }
            })
        } else {
            $this.addClass('active');
            $content.append('<span>' + city + '</span>');
        }

    });

    $(".ctlr").click(function () {
        var $this = $(this),
            $parContainer = $this.closest('.echo-content'),
            $text = $parContainer.find(".ctlr-text"),
            $content = $parContainer.find(".echo-content-item-container-content");
        if ($this.hasClass('open')) {
            $text.html('展开');
            $this.removeClass('open');
            $content.slideUp(300);
        } else {
            $text.html('收起');
            $this.addClass('open');
            $content.slideDown(300);
        }
    });



    /*全选*/
    $(".checkall").click(function () {
        var $this = $(this),
            $parContainer = $this.closest('.echo-content'),
            $citys = $parContainer.find('.echo-content-item-citys span'),
            $cityContent = $parContainer.find('.echo-content-item-container-content');
            citys = '';
        $citys.each(function (index, ele) {
            var city = $(ele).html();
            $(ele).addClass('active');
            citys += '<span>' + city + '</span>';
        });

        $cityContent.html(citys);

    });

    /*重置*/
    $(".reset").click(function () {
        var $this = $(this),
            $parContainer = $this.closest('.echo-content'),
            $citys = $parContainer.find('.echo-content-item-citys span'),
            $cityContent = $parContainer.find('.echo-content-item-container-content');
        $citys.each(function (index, ele) {
            $(ele).removeClass('active');
        });

        $cityContent.empty();

    });


    /*点击关闭*/
    $(".close").click(function () {
        alert('close clicked!');
    });


    /*点击确认*/
    $(".sure").click(function () {
        alert('sure clicked');
    })

    /*分页按钮*/
    $(".pager .pager-a").click(function () {
        var $this = $(this),
            $parContainer = $this.closest('.echo-content'),
            $siblingsPagerA = $parContainer.find('.pager-a');
        $siblingsPagerA.removeClass('active');
        $this.addClass('active');
    })
})