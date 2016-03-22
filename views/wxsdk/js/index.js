/**
 * Created by Echo on 2016/3/10.
 */

function initWx(data) {
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appid, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
}

wx.ready(function () {
    wx.onMenuShareAppMessage({
        title: '惊呆了！刘林林居然是个Gay!', // 分享标题
        desc: '惊天爆料,近日风行记者跟踪多日的天王巨星刘林林，被目击带疑似男宠回其在朝阳区的豪宅，男子在寓所内逗留整夜！', // 分享描述
        link: 'http://zhidaoer.com:5664/wxsdk/', // 分享链接
        imgUrl: 'http://zhidaoer.com:5664/wxsdk/img/banner.jpg', // 分享图标
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


