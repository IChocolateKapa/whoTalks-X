/**
 * Created by Echo on 2016/4/14.
 */

var Vue = require('vue');
Vue.config.silent = true;
var App = require('./app.vue');
var VueAsyncData = require('vue-async-data');
Vue.use(VueAsyncData);
var vm = new Vue({
    el: 'body',
    components: {
        app: App
    }
});
//vm.$on('generate-send');


function hasClass (src, clst) {
    var ret = false;
    for(var j = 0; j < clst.length; j++) {
        if (src == clst[j]) {
            ret = true;
            break;
        }
    }
    return ret;
}

function removeClass(src, clst) {
    var index;
    for(var j = 0; j < clst.length; j++) {
        if (src == clst[j]) {
            index = j;
            break;
        }
    }

    clst.splice(index, 1);
}