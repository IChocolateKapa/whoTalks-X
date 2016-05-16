/**
 * Created by Echo on 2016/5/16.
 */

var mongoose = require('mongoose'),
    commentSchema = require('./commentSchema');
var Comments = mongoose.model('Comments', commentSchema, 'Comments');

module.exports =  Comments;
