/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/6/11 13:16
 */

var UJS = require('uglify-js2');
var path = require('path');

/**
 * 生成错误处理函数
 * @param node
 * @returns {*}
 */
function genErrHandler(node, filename) {
  if(!node) {
    return '';
  }
  filename = path.basename(filename);

  var fn = [
    'var line = ' + node.start.line + ';',
    'var col = ' + node.start.col + ';',
    'var file = "' + filename + '";',
    'var func = "' + node.name.name + '";',
    'QNR.Utils.log("FUNCTION_ERROR@@", file, func, line, e);',
    'QNR.Utils.logError(e, file, func, line);'
  ];

  fn = fn.join('');
  return UJS.parse(fn).body;
}

module.exports = genErrHandler;