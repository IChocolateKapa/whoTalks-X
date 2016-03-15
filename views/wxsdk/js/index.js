/**
 * Created by Echo on 2016/3/10.
 */

$(function () {

    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: new Date(), // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });


    wx.hideOptionMenu();

   $("#send").click(function () {
       alert('jk');
       wx.onMenuShareTimeline({
           title: '', // 分享标题
           link: '', // 分享链接
           imgUrl: '', // 分享图标
           trigger: function () {
                alert('just triggered 分享按钮！');
           },
           success: function () {
               // 用户确认分享后执行的回调函数
               alert('喀喀喀成功分享了');
           },
           cancel: function () {
               // 用户取消分享后执行的回调函数
               alert('sss')
           }
       });

       wx.onMenuShareAppMessage({
           title: '惊呆了！刘林林居然是个Gay!', // 分享标题
           desc: '惊天爆料', // 分享描述
           link: 'http://cli.im/text?97e6e190839f4c9bb673bc0459ced808', // 分享链接
           imgUrl: 'http://www.2345.com/i/search0320/baidu_web.gif', // 分享图标
           type: 'link', // 分享类型,music、video或link，不填默认为link
           dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
           success: function () {
               // 用户确认分享后执行的回调函数
               alert('用户确认点击了分享给朋友按钮！');
           },
           cancel: function () {
               // 用户取消分享后执行的回调函数
               alert('用户取消了分享给朋友按钮~~~');
           }
       });
   });

    wx.onMenuShareTimeline({
        title: '', // 分享标题
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            alert('用户确认点击了分享给朋友圈按钮！');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });




    function share_me(webid, url, mytitle, summary){

        var title = "分享好文【"+mytitle+"】";

        var tsummary = title + summary;

        var share_services = {
            'tsina':  "http://service.weibo.com/share/share.php?title="+encodeURIComponent( tsummary )+"&url="+url,
            'qzone':  "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&title="+encodeURIComponent( title )+"&pics=&summary="+encodeURIComponent( summary ),
            'tqq':    "http://share.v.t.qq.com/index.php?c=share&a=index&title="+encodeURIComponent( tsummary )+"&url="+url,
            'renren': "http://widget.renren.com/dialog/share?resourceUrl="+url+"&srcUrl="+url+"&title="+encodeURIComponent( title )+"&pic=&description="+encodeURIComponent( summary ),
            'twitter':"http://twitter.com/intent/tweet?url="+url+"&text="+encodeURIComponent( tsummary ),
            'facebook':"http://facebook.com/sharer.php?u="+url,
            'more':   "http://www.jiathis.com/send/?webid=" + webid + "&url="+url+"&title="+encodeURIComponent("分享好文：【"+title+"】")+"&summary="+encodeURIComponent(summary)
        };

        window.open(share_services[webid], "_blank", "width=615,height=505");
    }

    function t(app) {
        var summary = '';
        var description;
        var metas = document.getElementsByTagName('meta');
        for (var x=0,y=metas.length; x<y; x++) {
            if (metas[x].name.toLowerCase() == "description") {
                description = metas[x];
            }
        }
        if( description ) summary = description.content;

        var title = document.title;

        var url = document.location.href;

        share_me(app, url, title, summary);
    }


    wx.onMenuShareAppMessage({
        title: '惊呆了！刘林林居然是个Gay!', // 分享标题
        desc: '惊天爆料', // 分享描述
        link: 'http://cli.im/text?97e6e190839f4c9bb673bc0459ced808', // 分享链接
        imgUrl: 'http://www.2345.com/i/search0320/baidu_web.gif', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            alert('用户确认点击了分享给朋友按钮！');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            alert('用户取消了分享给朋友按钮~~~');
        }
    });

});


