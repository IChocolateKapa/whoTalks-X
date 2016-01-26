/**
 * Created by Echo on 2016/1/14.
 */



var mongoUtil = {
    config: {
        'host': '127.0.0.1',
        'port': 27017,
        'dbname': 'echotest'
    },

    init: function (config) {

        var util = require("util"),
            extend = util._extend;

        var thisCfg = extend(this.config, config);

        var mongoose = require('mongoose'),
            Schema = mongoose.Schema;

        // Define User schema
        var UserSchema = new Schema({
            email : String,
            username : String,
            password : String
        });
        var UserModel = mongoose.model('UserModel', UserSchema);

        var alexEntity = new UserModel({
            email: 'echo@145.com',
            username: 'wuhaiping',
            password: '123643r43'
        });

        alexEntity.save();

        console.log("alexEntity'info: ", alexEntity);
        //console.log("alexEntity.speak: ", alexEntity.speak());

        /*alexEntity.virtual('email').get(function () {
            console.log("in getter, this: ", this)
        })*/

        var db = mongoose.createConnection('mongodb://' + thisCfg.host + ':' + thisCfg.port + '/' + thisCfg.dbname, {
            server: {poolSize: 4}
        });

        console.log("db = ", db);


        db.on('error',console.error.bind(console,'连接错误:'));

        //db.




    },

    use: function () {

    },


};


// export them
module.exports =  mongoUtil;
