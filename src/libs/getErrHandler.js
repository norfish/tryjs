/**
 * Description: error handler function
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/8/25 19:42
 */

var acorn = require('acorn');
var path = require('path');
var Utils = require('./utils.js');
var AST = Utils.AST;
var escodegen = require('escodegen');
var taskConfig = require('./taskConfig.js');

var errHandler = taskConfig.getConfig().errHandler;

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
    var funcName = node.id && node.id.name;
    errHandler = escodegen.generate(AST.Identifier(errHandler));

    var src = '{' +
        'var filename = (typeof module === "undefined" ? ' + file + ' : module && module.filename);' +
        'var handlerFn = ' + errHandler + ';' +
        '(typeof handlerFn === "function") ? handlerFn(e, filename,'+ funcName +') : "";' +
        getThrowFn('e')+
    '}';

    return {
        type: "CatchClause",
        param: AST.Identifier('e'),
        body: acorn.parse(src)
    };
}

function getThrowFn(e) {
    var ast = AST.Throw( AST.Identifier('e') );
    return escodegen.generate(ast);
}

module.exports = genErrHandler;