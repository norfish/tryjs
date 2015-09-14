/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/11 11:01
 */

var escodegen = require('escodegen');
var acorn = require('acorn');
var falafel = require('falafel');
var _ = require('lodash');
var Utils = require('./utils.js');
var md5 = require('MD5');
var getErrHandler = require('./getErrHandler.js');

function parse(src, filePath) {
    var output = falafel(src, function (node) {

        if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') {
            if(!node.id) {
                node.id = Utils.AST.Identifier( _getUName(node) );
            }
            node = wrapTry(node, filePath);
            node.update( escodegen.generate(node) );
        }
    });

    return output;
}

function wrapTry(node, filePath) {
    var splited = Utils.AST.splitNestFn(node);

    //是否已经编译过，防止重复编译
    if(isWrapped(splited.normal)){
        return node;
    }

    var wraped = {
        type: "TryStatement",
        block: Utils.AST.Block( splited.normal ),
        handler: getErrHandler(node, filePath),
        finalizer: null
    };

    var newBody = [].concat(splited.nest);
    newBody.push(wraped);

    node.body.body = newBody;
    return node;
}

function isWrapped(node) {
    return node[0].type === 'TryStatement';
}

/**
 * 生成自定义函数名
 * @returns {string|string|context.name|code.name|test.name|name|*}
 * @private
 */
function _getUName(node){
    var md5_name = md5( escodegen.generate(node) );
    return 'func_trir_' + md5_name;
}

module.exports = parse;