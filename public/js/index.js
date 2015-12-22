/**
 * Created by Echo on 2015/12/22.
 */

$(function () {

    var getCodeDom = document.getElementById("getCode");

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(getCodeDom);
        }, false);

        getCodeDom.addEventListener("touchend", function () {
            var ret = confirm("简单模拟一下是否确认要发送验证码？");
            if (ret) {
                $.ajax({
                    url: '/sendCode',
                    type: "post",
                    data: {
                        'phone': $("#phone").val()
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.status === "success") {
                            window.location.href = "/login"
                        }
                    }
                })
            }
        })
    }
});