/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/15 12:27
 */

var tryjs = require('./src/try.js');
var taskConfig = require('./src/libs/taskConfig');

function run(options) {
    if(options.configFile) {
        taskConfig.setConfigPath(options.configFile);
    }

    if(options.file) {
        taskConfig.setConfig('compileFile', options.file);
    }

    if(options.directory) {
        taskConfig.setConfig('directory', options.directory);
    }

    //run compile
    tryjs();
}

exports.run = run;