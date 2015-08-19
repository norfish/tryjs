/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/7/23 18:40
 */

var Esprima = require('esprima');
var astral = require('astral');
var escodegen = require('escodegen');
var eswalk = require('./lib/eswalk');
var acorn = require('acorn');
var rocambole = require('rocambole');
var falafel = require('falafel');
var _ = require('./lib/utils.js');

var src = 'function fn(a, b){ ' +
    'var sum; ' +
    'sum = a + b; ' +
    'return sum; ' +
    'function foo(){ var na = "gg";}' +
  '}' +
   '(function(){})';

/*var ast = rocambole.parse(src);

rocambole.walk(ast, function(node) {
    if(node.type === 'VariableDeclaration') {
        update(node, 'debugger');
    }
    return node;
});*/

var ast = Esprima.parse(src);
debugger
var output = falafel(src, function (node) {
    if (node.type === 'FunctionDeclaration') {
        /*node.id = {
            name: 'fn2',
            type: 'Identifier'
        };*/
        node = wrapTry(node);
        var ll = escodegen.generate(node);
        //console.log(ll, '##LL##');
        node.update( escodegen.generate(node) );
    }
    /*if (node.type === 'FunctionExpression') {
        if(!node.id) {
            node.id = {
                name: 'fn3',
                type: 'Identifier'
            };
        }

        node.update( escodegen.generate(node) );
    }*/
});

function wrapTry(node) {
    var splited = splitNestFn(node);

    var bdBlock;
    var wraped = {
        type: "TryStatement",
        block: _generateBlock( splited.normal ),
        handler: getCatch(),
        finalizer: null
    };
    var newBody = [].concat(splited.nest);
    newBody.push(wraped);

    bdBlock = {
        type: "BlockStatement",
        body: newBody
    };
    node.body.body = newBody;
    return node;
}

function isNestFn(node) {

}

function _generateBlock(body) {
    return {
        type: "BlockStatement",
        body: body
    }
}

/**
 * 分离函数体内部的声明函数和其他
 * @param node
 * @returns {{nest: Array, normal: Array}}
 */
function splitNestFn(node) {
    var nest = [],
        normal = [];
    var block = node.body,
        fnText = block.body;

    fnText.forEach(function(item, i) {
        if (item.type === 'FunctionDeclaration') {
            nest.push(item);
        } else {
            normal.push(item);
        }
    });

    return {
        nest: nest,
        normal: normal
    };
}

function getCatch(){
    var src = '{' +
        'var a = 1; ' +
        'console.log(a); ' +
        'QNR.Utils.log("FUNCTION_ERROR@@", e);' +
        '}';
    var ind = {
        type: 'Identifier',
        name: 'e'
    };
    return {
        type: "CatchClause",
        param: ind,
        body: acorn.parse(src)
    };
}

console.log(output);



