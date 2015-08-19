/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/6/11 13:44
 */
var fs = require('fs');

function write(outpath, source) {
  fs.writeFile(outpath, source, function(err) {
    if(err) {
      console.log('failed when write into ' + outpath);
    }
  });
}

module.exports = write;