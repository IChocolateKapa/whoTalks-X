<style lang="less">
    .fade{
        &-transition {
            transition: opacity .3s ease;
        }
        &-enter, &-leave {
            opacity: 0;
        }
    }
</style>

<template>
    <section class="dongtan" v-for="pro in prodata" tracke-by="$index" transition="fade"
             transition-mode="out-in">
        <div class="head pr">
            <img class="headimg" src="{{pro.headimg}}" alt="headimg"/>
            <div class="dongtan-content">
                <p class="author">{{pro.author}}</p>
                <p class="tip"><span>{{pro.time}}</span> <span>来自</span><strong>{{pro.client}}</strong></p>
                <p class="content">
                    {{pro.content}}
                </p>
            </div>
            <div class="dongtan-footer">
                <div class="star" @click="toggleClass($index, 'star')" :class="{ 'active': pro.starflag}"></div>
                <div class="comment" @click="toggleComment($index)"></div>
                <div class="like" @click="toggleClass($index)" :class="{ 'active': pro.likeflag}" >
                    <span>{{pro.likes}}</span>
                </div>
            </div>

            <my-comment :cmtdata="pro.comments" :index="$index" v-show="pro.showflag" v-model="pro.showflag" transition="fade"
                        transition-mode="out-in"></my-comment>
        </div>
    </section>
</template>

<script>
    var commentVue = require('./comment.vue');
    /*var socket1 = require('socket.io-client'),
        socket = socket1();*/
    module.exports = {
        data: function () {
            return {
                prodata: [],
                pro: {},
                socket: this.$parent.socket
            }
        },
        ready: function () {
            var self = this;
            self.$parent.socket.on('showLikes', function (info) {
                self.prodata[info.index].likes += info.dif;
            })
        },
        components: {
            'my-comment': commentVue
        },
        methods: {
            toggleComment: function (index) {
                var self = this,
                    curFlag = self.prodata[index].showflag;
                    self.prodata[index].showflag = !curFlag;
            },
            toggleClass: function (index, type) {
                var self = this;
                var curFlag;
                if (type) {
                    curFlag = self.prodata[index].starflag;
                    self.prodata[index].starflag = !curFlag;
                } else {
                    curFlag = self.prodata[index].likeflag;
                    var dif = 1;
                    if (curFlag) dif = -1;
                    self.prodata[index].likeflag = !curFlag;

                    var tem = {
                        index: index,
                        dif: dif
                    };
                    self.socket.emit('sendLikes',  tem);
                }

            }
        },

        props: ['prodata', 'cmtdata']
    }
</script>