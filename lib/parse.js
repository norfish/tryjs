/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/6/11 13:34
 */

var UJS = require('uglify-js2');
var genErrHandler = require('./genErrHandler');

var _transformer = new UJS.TreeTransformer(null, function(node) {

  if(node instanceof UJS.AST_Lambda) {

    if(node instanceof UJS.AST_Function) {
      //node.name = {name: _getUName()}
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
function parse(code) {
  var toplevel = UJS.parse(src);
  var t2 = toplevel.transform(_transformer);
  return t2.print_to_string({ beautify: true });
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
  console.log('try', tc.print_to_string({beautify: true}));
  return tc;
}

/**
 * 生成catch
 * @param node
 * @returns {UJS.AST_Catch}
 */
function wrapCatch(node) {
  var tmp = new UJS.AST_Catch({
    body: genErrHandler(node),
    argname: new UJS.AST_SymbolCatch({
      name: 'e'
    })
  });
  return tmp;
}

module.exports = parse;
