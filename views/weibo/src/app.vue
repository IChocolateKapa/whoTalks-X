<template>
    <header>
        <h4>快来动弹一下吧~</h4>
    </header>

    <section class="send_text">
        <textarea v-model="msg" class="text mysend" placeholder="发布你的动弹~"></textarea>
        <div class="send_wrap">
            <input type="button" class="input danger" @click="notify()" value="发布"/>
        </div>
    </section>

    <dongtan :prodata="prodata"></dongtan>
</template>

<script>
    var dongtanVue = require('../components/dongtan.vue'),
        $ = require('jquery');

    module.exports = {
        components: {
            'dongtan': dongtanVue
        },
        methods: {
            notify: function () {
                if (this.msg.trim()) {
                    this.$emit('generate-send', this.msg);
                    this.msg = '';
                }
            },
            setData : function(data){
                this.$data.prodata = data;
            }
        },
        events: {
            'generate-send': function (msg) {
                var self = this;
                var protemp = {
                    content: msg,
                    author: 'Lilei',
                    time: new Date() + '',
                    likes: 0,
                    client: '三星S5',
                    headimg: './img/myhead/'+Math.floor(Math.random() * 6) + '.jpg',
                    comments: []
                };
                self.prodata.push(protemp);

            }
        },
        data: function () {
          return {
              msg: '',
              prodata: []
          }
        },
        asyncData: function (resolve, reject) {
            // load data and call resolve(data)
            // or call reject(reason) if something goes wrong
            $.ajax({
                type: 'post',
                url: '/getFakeData',
                dataType: 'json',
                success: function (data) {
                    resolve({
                        prodata: data.data
                    })
                },
                error: function () {
                    reject({
                        prodata: []
                    })
                }
            });
        }
    }
</script>