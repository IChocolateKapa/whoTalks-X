/**
 * Created by Echo on 2016/4/7.
 */

require(['vue'], function (Vue) {
    require(['text!../src/app.vue'], function (data) {
        console.log('data: ', data);
    });

});