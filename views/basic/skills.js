/**
 * Created by Echo on 2016/5/11.
 */
/*JAVASCRIPT中的小技巧*/

var fs = require('fs');
var markdown = require( "markdown" ).markdown;
var fileContent = fs.readFileSync('skills.md', 'utf-8');
console.log('fileContent: ', fileContent);
// 使用 MarkdownJS 模块把源文件转换为 HTML 源代码
fileContent = markdown.toHTML(fileContent);
// 保存
fs.writeFileSync('skills.html', fileContent);
console.log('Done!');


