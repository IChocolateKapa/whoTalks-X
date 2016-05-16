/**
 * Created by Echo on 2016/5/16.
 */
var mongoose = require('mongoose'),
    dongtanSchema = require('./dongtanSchema');


/*model()方法的第一个参数并不是真正的表名， mongo内部会把第一个参数小写化并且后面追加一个s,比如Dongtan会变成dongtans*/
/*所以要指定表名，就要使用第三个参数，与第一个参数传递的值相同即可。*/
var Dongtan = mongoose.model('Dongtan', dongtanSchema, 'Dongtan');

module.exports = Dongtan;

