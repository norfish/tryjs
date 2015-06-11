/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/6/11 13:16
 */

var UJS = require('uglify-js2');

/**
 * 生成错误处理函数
 * @param node
 * @returns {*}
 */
function genErrHandler(node, filename) {
  if(!node) {
    return '';
  }

  var fn = [
    'var line = ' + node.start.line + ';',
    'var col = ' + node.start.col + ';',
    'var file = "' + filename + '";',
    'console.log("FUNCTION_ERROR@@", line, col, file);',
    'logError(line, col, file)'
  ];

  fn = fn.join('');
  return UJS.parse(fn).body;
}

module.exports = genErrHandler;