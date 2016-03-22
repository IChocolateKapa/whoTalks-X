/**
 * Created by Echo on 2016/2/29.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define User schema
var UserSchema = new Schema({
    email : String,
    username : String,
    password : String
});
var UserModel = mongoose.model('UserModel', UserSchema);
//event.preventImmediatePropagation();
exports.User = UserModel;