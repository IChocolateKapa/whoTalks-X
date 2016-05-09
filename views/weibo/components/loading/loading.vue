<style lang="less">
    .loading{
        /*width: 180px;*/
        /*height: 200px;*/
        width: 100%;
        height: 100%;
        background: url("./walk.png") no-repeat;
        animation: walk 2s step-start infinite;
        background-position-y: 0;

    }
    @keyframes walk {
        0% {
            background-position-x: 0;
        }
        10%{
            background-position-x: -180px;
        }
        20%{
            background-position-x: -360px;
        }
        30%{
            background-position-x: -540px;
        }
        40%{
            background-position-x: -720px;
        }
        50%{
            background-position-x: -900px;
        }
        60%{
            background-position-x: -1080px;
        }
        70%{
            background-position-x: -1260px;
        }
        80%{
            background-position-x: -1440px;
        }
        90%{
            background-position-x: -1620px;
        }
        90%{
            background-position-x: 0;
        }
    }
    @-webkit-keyframes walk {
        0% {
            background-position-x: 0;
        }
        10%{
            background-position-x: -180px;
        }
        20%{
            background-position-x: -360px;
        }
        30%{
            background-position-x: -540px;
        }
        40%{
            background-position-x: -720px;
        }
        50%{
            background-position-x: -900px;
        }
        60%{
            background-position-x: -1080px;
        }
        70%{
            background-position-x: -1260px;
        }
        80%{
            background-position-x: -1440px;
        }
        90%{
            background-position-x: -1620px;
        }
        90%{
            background-position-x: 0;
        }
    }
</style>

<template>
    <div class="loading"></div>
</template>