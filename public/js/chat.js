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
        socket.emit('chatMessage', $('#chat-msg').val(), {for: 'everyone'});
        $('#chat-msg').val('');
        return false;
    });

    socket.on('chat message', function (msg) {
        $(".main_wrap").append('<div class="dialog chatmsg w_50"><p>' + msg + '</p></div>');
    });

    socket.on('totalUser', function (num) {
        $("#total").html("当前 " + num + " 人在线")
    })


});