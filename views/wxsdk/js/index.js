/**
 * Created by Echo on 2016/3/10.
 */

$(function () {

    wx.config({
        debug: true, // ��������ģʽ,���õ�����api�ķ���ֵ���ڿͻ���alert��������Ҫ�鿴����Ĳ�����������pc�˴򿪣�������Ϣ��ͨ��log���������pc��ʱ�Ż��ӡ��
        appId: '', // ������ںŵ�Ψһ��ʶ
        timestamp: new Date(), // �������ǩ����ʱ���
        nonceStr: '', // �������ǩ���������
        signature: '',// ���ǩ��������¼1
        jsApiList: [] // �����Ҫʹ�õ�JS�ӿ��б�����JS�ӿ��б����¼2
    });


    wx.hideOptionMenu();

   $("#send").click(function () {
       alert('jk');
       wx.onMenuShareTimeline({
           title: '', // �������
           link: '', // ��������
           imgUrl: '', // ����ͼ��
           trigger: function () {
                alert('just triggered ����ť��');
           },
           success: function () {
               // �û�ȷ�Ϸ����ִ�еĻص�����
               alert('�������ɹ�������');
           },
           cancel: function () {
               // �û�ȡ�������ִ�еĻص�����
               alert('sss')
           }
       });

       wx.onMenuShareAppMessage({
           title: '�����ˣ������־�Ȼ�Ǹ�Gay!', // �������
           desc: '���챬��', // ��������
           link: 'http://cli.im/text?97e6e190839f4c9bb673bc0459ced808', // ��������
           imgUrl: 'http://www.2345.com/i/search0320/baidu_web.gif', // ����ͼ��
           type: 'link', // ��������,music��video��link������Ĭ��Ϊlink
           dataUrl: '', // ���type��music��video����Ҫ�ṩ�������ӣ�Ĭ��Ϊ��
           success: function () {
               // �û�ȷ�Ϸ����ִ�еĻص�����
               alert('�û�ȷ�ϵ���˷�������Ѱ�ť��');
           },
           cancel: function () {
               // �û�ȡ�������ִ�еĻص�����
               alert('�û�ȡ���˷�������Ѱ�ť~~~');
           }
       });
   });

    wx.onMenuShareTimeline({
        title: '', // �������
        link: '', // ��������
        imgUrl: '', // ����ͼ��
        success: function () {
            // �û�ȷ�Ϸ����ִ�еĻص�����
            alert('�û�ȷ�ϵ���˷��������Ȧ��ť��');
        },
        cancel: function () {
            // �û�ȡ�������ִ�еĻص�����
        }
    });




    function share_me(webid, url, mytitle, summary){

        var title = "������ġ�"+mytitle+"��";

        var tsummary = title + summary;

        var share_services = {
            'tsina':  "http://service.weibo.com/share/share.php?title="+encodeURIComponent( tsummary )+"&url="+url,
            'qzone':  "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&title="+encodeURIComponent( title )+"&pics=&summary="+encodeURIComponent( summary ),
            'tqq':    "http://share.v.t.qq.com/index.php?c=share&a=index&title="+encodeURIComponent( tsummary )+"&url="+url,
            'renren': "http://widget.renren.com/dialog/share?resourceUrl="+url+"&srcUrl="+url+"&title="+encodeURIComponent( title )+"&pic=&description="+encodeURIComponent( summary ),
            'twitter':"http://twitter.com/intent/tweet?url="+url+"&text="+encodeURIComponent( tsummary ),
            'facebook':"http://facebook.com/sharer.php?u="+url,
            'more':   "http://www.jiathis.com/send/?webid=" + webid + "&url="+url+"&title="+encodeURIComponent("������ģ���"+title+"��")+"&summary="+encodeURIComponent(summary)
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
        title: '�����ˣ������־�Ȼ�Ǹ�Gay!', // �������
        desc: '���챬��', // ��������
        link: 'http://cli.im/text?97e6e190839f4c9bb673bc0459ced808', // ��������
        imgUrl: 'http://www.2345.com/i/search0320/baidu_web.gif', // ����ͼ��
        type: 'link', // ��������,music��video��link������Ĭ��Ϊlink
        dataUrl: '', // ���type��music��video����Ҫ�ṩ�������ӣ�Ĭ��Ϊ��
        success: function () {
            // �û�ȷ�Ϸ����ִ�еĻص�����
            alert('�û�ȷ�ϵ���˷�������Ѱ�ť��');
        },
        cancel: function () {
            // �û�ȡ�������ִ�еĻص�����
            alert('�û�ȡ���˷�������Ѱ�ť~~~');
        }
    });

});


