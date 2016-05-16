/**
 * Created by Echo on 2016/5/16.
 */

var mongoose = require('mongoose'),
    commentSchema = require('./commentSchema');

var dongtanSchema = mongoose.Schema({
    headimg: String,
    author: String,
    time: String,
    client: String,
    likes: Number,
    likeflag: Boolean,
    content: String,
    comments: [commentSchema],
    showflag: Boolean,
    starflag: Boolean
});

module.exports = dongtanSchema;