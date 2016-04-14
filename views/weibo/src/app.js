/**
 * Created by Echo on 2016/4/14.
 */

var Vue = require('vue');
var App = require('./app.vue');
var vm = new Vue({
    el: 'body',
    components: {
        app: App
    }
});
vm.$on('generate-send');
