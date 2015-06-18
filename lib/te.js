/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/6/11 20:10
 */

var exec = require("child_process").exec;

exec("/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome", function(err, stdout) {
  console.log(err);
});