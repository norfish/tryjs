/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/7/20 19:44
 */

var fs = require('fs');
var walk = require('./walk.js');
var Q = require('q');
var Esprima = require('esprima');
var falafel = require('falafel');
var escodegen = require('escodegen');

/**
 *
 * @param options
 */
function compile(options) {
  var _fileLists = walk(options.directory);

  _fileLists.forEach(function(file) {

    var deferred = Q.defer();
    fs.readFile(file, 'utf-8', function(err, source) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(source.toString());
      }
    })
      .then( function(source) {
        return parse(source);
      })
      .then( function(parsed) {
        var outFile = getOutputFile(file, options);
        write(parsed, outFile);
      })
  });
}

/**
 * 根据配置获取输入文件的输出路径地址
 * @param file
 * @param options
 * @returns {*}
 */
function getOutputFile(file, options) {
  return file;
}

function _parse(source) {
    falafel(source, function(node) {
        var _parsedBlock = _parseBlockFnDec();
    });
}

/**
 * 分离函数block 内部的函数声明与其他
 * @param node 函数声明node
 * @returns {{dec: Array, others: Array}}
 * @private
 */
function _parseBlockFnDec(node) {
    var fn = [],
        others = [];

    node.body.forEach(function(item, i) {
        if(node.type === 'FunctionDeclaration') {
            fn.push(item);
            //node.splice(i, 1);
        } else {
            others.push(item);
        }
    });
    return  {
        dec: fn,
        others: others
    }
}

function wrapTry(block) {
    node.body = {
        type: "TryStatement",
        block: block,
        handler: getErrHandler(),
        finalizer: null
    };
    return node;
}

function getErrHandler() {
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


module.exports = compile;
