<style lang="less">
    .loading{
        /*width: 180px;*/
        /*height: 200px;*/
        width: 100%;
        height: 100%;
        background: url("./walk.png") no-repeat;
        animation: walk 2s step-start infinite;
        background-size: cover;/*移动端也可以用雪碧图？使用此属性之后，其实如果rem的值是好几位小数，就会产生较大的偏差*/
        background-position-y: 0;
    }
    @keyframes walk {
        0% {
            background-position-x: 0;
        }
        10%{
            background-position-x: -1.8rem;
        }
        20%{
            background-position-x: -3.6rem;
        }
        30%{
            background-position-x: -5.4rem;
        }
        40%{
            background-position-x: -7.2rem;
        }
        50%{
            background-position-x: -9rem;
        }
        60%{
            background-position-x: -10.80rem;
        }
        70%{
            background-position-x: -12.60rem;
        }
        80%{
            background-position-x: -14.40rem;
        }
        90%{
            background-position-x: -16.20rem;
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
            background-position-x: -1.80rem;
        }
        20%{
            background-position-x: -3.60rem;
        }
        30%{
            background-position-x: -5.40rem;
        }
        40%{
            background-position-x: -7.20rem;
        }
        50%{
            background-position-x: -9.00rem;
        }
        60%{
            background-position-x: -10.80rem;
        }
        70%{
            background-position-x: -12.60rem;
        }
        80%{
            background-position-x: -14.40rem;
        }
        90%{
            background-position-x: -16.2rem;
        }
        90%{
            background-position-x: 0;
        }
    }
</style>

<template>
    <div class="loading"></div>
</template>