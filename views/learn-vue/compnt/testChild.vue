<style>
    h2{padding: 0; margin: 0;}
    p{padding: 5px;}
    .title{
        font-size: 24px;
        color: #234567;
    }
    .content{
        font-size: 16px;
        color: #666;
    }
</style>
<template>
    <child-section>
        <h2 class="title">{{info.title}}</h2>
        <!--<p>{{info.subTitle}}</p>
        <p>{{info.author}}</p>
        <p>{{info.time}}</p>
        <p class="content">{{info.content}}</p>
        <p>{{info.likes}}</p>
        <ul>
            <li v-for="prop in info" tracke-by="$index">
                {{$index}} &#45;&#45; {{info}}
            </li>
            <li v-repeat="{{info}}">
                {{$key}}: {{$value}}
            </li>
        </ul>-->
    </child-section>
</template>


<script>
    module.exports = {
        name: 'articleSection',
        props: ['info']
    }
</script>
