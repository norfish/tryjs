/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/6/5 18:33
 */


var fs = require('fs'),
  UJS = require('uglify-js2'),
  Q = require('q'),
  mkdirp = require('mkdirp');

var _uid = 0;

var _file_path = './test/test.js';

/**
 * 过滤函数
 * @type {UJS.TreeTransformer}
 */
var trans = new UJS.TreeTransformer(null, function(node) {

  if(node instanceof UJS.AST_Lambda) {

    if(node instanceof UJS.AST_Function) {
      //node.name = {name: _getUName()}
    }
    var tcode = wrapTry(node);
    node.body = [tcode];
    return node;
  }
});

//解析文件
fs.readFile(_file_path, function(err, src){
  if(err){
    console.log('error');
    return;
  }

  src = src.toString();

  var toplevel = UJS.parse(src);
  var t2 = toplevel.transform(trans);
  var t2s = t2.print_to_string({ beautify: true });
  fs.writeFile('./test/tese.ps.js', t2s, function(err) {
    if(err){
      console.log('there is an error');
    } else {
      console.log('write successed');
    }
  });
  console.log('tranformed####', t2.print_to_string({ beautify: true }), '#####');
});


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
    body: generateHandle(node),
    argname: new UJS.AST_SymbolCatch({
      name: 'e'
    })
  });
  return tmp;
}


function replaceAtom(src, atom, start, end){
  src = src.substr(0, start) + atom + src.substr(end);
  return src;
}

/**
 * 生成错误处理函数
 * @param node
 * @returns {*}
 */
function generateHandle(node) {
  if(!node) {
    return '';
  }
  var fn = [
    'var line = ' + node.start.line + ';',
    'var col = ' + node.start.col + ';',
    'var file = "' + _file_path + '";',
    'console.log("FUNCTION_ERROR@@", line, col, file);',
    'logError(line, col, file)'
  ];

  fn = fn.join('');
  return UJS.parse(fn).body;
}

function _getUName(){
  return '__TRIER__FUNC__' + _uid++;
}

/**
 * 发送错误
 * @param line
 * @param col
 * @param file
 */
function logError(line, col, file) {
  console.log('log', line, col, file);
}

/**
 *
   - 0. id  FLIGHT_
   - 1. error-name
   - 2. error-message
   - 3. url.
   - 4. filename  编译的时候加上
   - 5. lineNum
   - 6. function name
 *
 */

