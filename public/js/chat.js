/**
 * Created by Echo on 2016/1/15.
 */


$(function () {
    var socket = io();
    /*socket.on('connection', function () {
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
    socket.on('event', function(data){});
    socket.on('disconnect', function(){});*/
    $('#send').bind("click", function () {
        socket.emit('chatMessage', $('#chat-msg').val());
        $('#chat-msg').val('');
        return false;
    });

    socket.on('chat message', function (msg) {

        /*socket.get('nickname', function (err, name) {

        });*/
        $(".main_wrap").append('<div class="dialog chatmsg w_50"><p>' + msg + '</p></div>');
    });

    socket.on('totalUser', function (num) {
        $("#total").html("当前 " + num + " 人在线")
    });

    socket.on('userLogin', function (user) {
        $('<p class="tip">' + user + '进入聊天室...</p>').insertAfter($("#total"));
    })
    socket.on('userLogout', function (user) {
        $('<p class="tip">' + user + '离开聊天室....</p>').insertAfter($("#total"));
    })


});