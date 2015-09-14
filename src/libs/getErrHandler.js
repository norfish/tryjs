/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/8/25 19:42
 */

var acorn = require('acorn');
var path = require('path');
var Utils = require('./utils.js');
var AST = Utils.AST;
var escodegen = require('escodegen');

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

    var src = '{' +
        'var file = "' + file + '";' +
        'var filename = (typeof module === "undefined" ? file : module && module.filename);' +
        'console.log("FUNCTION_ERROR@@", e, filename, '+ funcName +');' +
        getThrowFn(funcName, 'e')+
    '}';

    return {
        type: "CatchClause",
        param: AST.Identifier('e'),
        body: acorn.parse(src)
    };
}

function getThrowFn(func, e) {
    func = AST.Literal('FUNC_ERROR@@' + func);
    var type = AST.MemberExpression(AST.Identifier('e'), AST.Identifier('name'));
    var newExp = AST.New(AST.Error(), [AST.PlusExpression(func, type)]);
    var ast = AST.Throw(newExp);

    return escodegen.generate(ast);
}

module.exports = genErrHandler;