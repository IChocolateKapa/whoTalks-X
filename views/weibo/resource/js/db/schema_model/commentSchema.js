/**
 * Created by Echo on 2016/5/16.
 */
var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
    headimg: String,
    author: String,
    time: String,
    likes: Number,
    likeflag: Boolean,
    content: String
});

module.exports = commentSchema;