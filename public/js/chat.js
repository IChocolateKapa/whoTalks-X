/**
 * Created by Echo on 2016/1/15.
 */


$(function () {
    var socket = io();
    $('#send').bind("click", function () {
        socket.emit('chat message', $('#chat-msg').val());
        $('#chat-msg').val('');
        return false;
    });


})