/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/6/11 13:34
 */

var UJS = require('uglify-js2');
var genErrHandler = require('./genErrHandler');
var md5 = require('MD5');

var _filename = '';
var _uid = 0;

var _transformer = new UJS.TreeTransformer(null, function(node) {

  if(node instanceof UJS.AST_Lambda) {

    //避免重复加 try-catch
    if(node.body[0] instanceof UJS.AST_Try) {
      return node;
    }

    //为匿名函数增加函数名，方便定位
    if(node instanceof UJS.AST_Function) {
      node.name = _getUName(node);
    }
    var tcode = wrapTry(node);
    node.body = [tcode];
    return node;
  }
});

/**
 * 处理代码，增加 try-catch
 * @param code
 * @returns {*}
 */
function parse(code, filename) {
  _filename = filename;
  var toplevel = UJS.parse(code);
  var t2 = toplevel.transform(_transformer);
  return t2.print_to_string({ beautify: true, comments: true });
}


/**
 * 给指定的函数加try
 * @param node
 */
function wrapTry(node) {
  var tc = new UJS.AST_Try({
    body: node.body,
    start: node.start,
    end: node.end,
    bcatch: wrapCatch(node)
  });
  //console.log('try', tc.print_to_string({beautify: true}));
  return tc;
}

/**
 * 生成catch
 * @param node
 * @returns {UJS.AST_Catch}
 */
function wrapCatch(node) {
  var tmp = new UJS.AST_Catch({
    body: genErrHandler(node, _filename),
    argname: new UJS.AST_SymbolCatch({
      name: 'e'
    })
  });
  return tmp;
}

/**
 * 生成自定义函数名
 * @returns {string|string|context.name|code.name|test.name|name|*}
 * @private
 */
function _getUName(node){
  var md5_name = md5( node.print_to_string() );
  var name = 'func_trir_' + md5_name;
  var str = 'function ' + name +'(){};';
  return UJS.parse(str).body[0].name;
}

module.exports = parse;
