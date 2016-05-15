/**
 * Created by Echo on 2016/5/12.
 */

var Util = {
    convertToHTML: function (src, dest) {
        var fs = require('fs'),
            markdown = require( "markdown" ).markdown,
            fileContent = fs.readFileSync(src, 'utf-8'),
            fileName = dest || 'dest.html';

        // 使用 MarkdownJS 模块把源文件转换为 HTML 源代码
        fileContent = markdown.toHTML(fileContent);
        // 保存
        fs.writeFileSync(fileName, fileContent);
        console.log('Done Converting!');
    },


    getQueryStringArgs: function () {
        event.stopPropagation()
        var search = location.search,
            qs = search.length > 0 ? search.substring(1) : '',
            args = {};
        items = qs.length > 0 ? qs.split(':') : [],
            item = null,
            name = null,
            value = null,
            i = 0;
        len = items.length;

        for (i = 0; i< len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);

            if (name.length) {
                args[name] = value;
            }
        }

        return args;

    },
    /*mousedowm-event.button-0:左键， 1：中键，2：右键*/
    mouseMove: function (obj, moveHandler) {
        if (!!obj) return;
        var eventUtil = require('./eventUtil');

        var event = eventUtil.getEvent(event);

        eventUtil.addHandler(obj, 'mousedown', function (event) {
            eventUtil.addHandler(document, 'mousemove', function (event) {
                var event = eventUtil.getEvent(event);
            })


            eventUtil.addHandler(document, 'onmouseup', function (event) {
                var event = eventUtil.getEvent(event);
            })

        })
    }




};

module.exports = Util;

