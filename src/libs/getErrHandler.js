/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/8/25 19:42
 */

var acorn = require('acorn');
var path = require('path');
var Utils = require('./utils.js');

/**
 * 生成错误处理函数
 * @param node
 * @returns {*}
 */
function genErrHandler(node, file) {
    if(!node) {
        return '';
    }

    file = path.basename(file);

    var src = '{' +
        'var file = "' + file + '";' +
        'var filename = (typeof module === "undefined" ? file : module && module.filename);' +
        'console.log("FUNCTION_ERROR@@", e, filename);' +
    '}';

    return {
        type: "CatchClause",
        param: Utils.AST.Identifier('e'),
        body: acorn.parse(src)
    };
}

module.exports = genErrHandler;