/**
 * Description: parse code with try-catch
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/11 11:01
 */

var escodegen = require('escodegen');
var acorn = require('acorn');
var falafel = require('falafel');
var _ = require('lodash');
var path = require('path');
var Utils = require('./utils.js');
var md5 = require('MD5');
var getErrHandler = require('./getErrHandler.js');

function parse(src, filePath) {
    console.log('##transforming', path.basename(filePath));
    var output = falafel(src, function (node) {

        if (node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration') {
            if(!node.id) {
                node.id = Utils.AST.Identifier( _getUName(node) );
            }
            node = wrapTry(node, filePath);
            node.update( escodegen.generate(node, {comment: true}) );
        }
    });

    return output;
}

function wrapTry(node, filePath) {
    var splited = Utils.AST.splitNestFn(node);
    var normal = splited.normal;
    var nest = splited.nest;

    //是否已经编译过，防止重复编译,有可能是空函数
    if(!normal.length || isWrapped(normal)){
        return node;
    }

    var wraped = {
        type: "TryStatement",
        block: Utils.AST.Block( normal ),
        handler: getErrHandler(node, filePath),
        finalizer: null
    };

    var newBody = [].concat(nest);
    newBody.push(wraped);

    node.body.body = newBody;
    return node;
}

function isWrapped(node) {
    return node.length ? node[0].type === 'TryStatement' : true;
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
