/**
 * Created by Echo on 2015/12/23.
 */

$(function () {


    function countDown () {
        var cn = 5;
        var timer = setInterval(function () {
            if (cn >= 0) {
                $("#count").html(cn+"s");
                cn--;
            } else {
                clearInterval(timer);
                $("#count").hide().html("60s");
                $(".reSend").addClass("danger").addClass("color-fff");
            }
        }, 1000);
    }


    countDown();


    /**
     * 输入验证码时 重发验证码的提示以及计时器都应清空 -- 逻辑错误-- give up
     * */
    /*$("#code").keyup(function () {
        clearInterval(timer);
    });*/

    /*给重新发送按钮绑定touch事件*/
    var reSendDom = document.getElementsByClassName("reSend");

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(reSendDom);
        }, false);

        $(".reSend").on("touchend", function () {
            alert(phoneNum)
            var ret = confirm("重新发送验证码到" + phoneNum + "吗？");
            if (ret) {
                $.ajax({
                    url: '/sendCode',
                    type: "post",
                    data: {
                        'phone': +phoneNum
                    },
                    dataType: "json",
                    success: function (data) {
                        //alert(global.phone);//js里面是获取不到node中global对象中数据的
                        if (data.status === "success") {
                            //window.location.href = "/fillCode?code=" + data.code;
                            phoneNum = data.phone;
                            countDown();
                            $("#count").show();
                            $(".reSend").removeClass("danger").removeClass("color-fff");
                        }
                    }
                })
            }
        });
        /*reSendDom.addEventListener("touchend", function () {
            var ret = confirm("重新发送验证码到" + phoneNum + "吗？");
            if (ret) {
                $.ajax({
                    url: '/sendCode',
                    type: "post",
                    data: {
                        'phone': +phoneNum
                    },
                    dataType: "json",
                    success: function (data) {
                        //alert(global.phone);//js里面是获取不到node中global对象中数据的
                        if (data.status === "success") {
                            window.location.reload();
                        }
                    }
                })
            }
        })*/

    } else {
        console.log("can not recognize addEventListener.....");
    }



    /**
     * click finish button to emit save option
     * */
    $("#save").on("touchend", function () {
        /*$.ajax({
            url: "test.html",
            cache: false
        })
            .done(function (data, textStatus, jqXHR) {

            })
            .success(function (data, status) {
                console.log(data)
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log('error: '+textStatus);
            });*/


        $.ajax({
            url: '/saveAccount',
            type: 'post',
            data: {
                phone: phoneNum,
                password: $("#password").val(),
                code: $("#code").val()
            },
            dataType: 'json',
            /*beforeSend中注册onprogress事件,跟踪进度*/
            /*beforeSend: function (XMLHttpRequest) {
                //Upload progress
                XMLHttpRequest.upload.addEventListener("progress", function(evt){
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with upload progress
                        console.log(percentComplete);
                    }
                }, false);
                //Download progress
                XMLHttpRequest.addEventListener("progress", function(evt){
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with download progress
                        console.log(percentComplete);
                    }
                }, false);
            },*/
            success: function (data, status) {
                if (data.status !== "success") {
                    alert("验证码输入错误,请重新检查!");
                } else {
                    window.localStorage["user"] = JSON.stringify([{
                        'userID': phoneNum,
                        'password':  $("#password").val()
                    }]);
                    //取值： $.parseJSON(window.localStorage["user"]), 就可以愉快的取值了



                }
            }

        })
    })


});