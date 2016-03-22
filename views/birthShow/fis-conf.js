/**
 * Created by Echo on 2016/1/27.
 */


var pageName = "dist";  //当前项目的名称,用来命名当前项目专用的JS和CSS


//启用打包
fis.match('::package', {
    postpackager: fis.plugin('loader')
});

//启用less编译
/*
fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css',
    optimizer: fis.plugin('clean-css')
});



fis.match('*.css', {
    optimizer: fis.plugin('clean-css') // css 压缩
});
 */

fis.match('*.js', {
    optimizer: fis.plugin('uglify-js') // js 压缩
});
fis.match('*.css', {
    optimizer: fis.plugin('clean-css') // css 压缩
});
fis.match('*.png', {
    optimizer: fis.plugin('png-compressor'), // png 图片压缩
    packTo: pageName+'.png'
});


//开始合并、打包各个模块
/*fis.match('/css/!*.{less,css}', {
    packTo: '/css/'+pageName+'.css'
});
fis.match('*.js', {
    packTo: pageName+'.js',
    useHash: false
});*/


/*// 生成雪碧图
fis.match('*.{less,css}', {
    release: '/$0',
    useSprite: true
});*/


//设置发布路径

fis.match('*', {
    release: '/$0'
});


//这里是一些不需要发布的文件列表，以下为默认值，需要时可以解封然后添加需要屏蔽的文件夹/文件。
fis.set('project.ignore', [
    'fis-conf.js',
    '.git/**',
    '*.bat'
]);
