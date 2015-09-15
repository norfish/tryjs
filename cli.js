/**
 * Description: 命令行入口
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/14 14:49
 */

var tryjs = require('./src/try.js');
var taskConfig = require('./src/libs/taskConfig');

function run(cmd) {
    if(cmd.configFile) {
        taskConfig.setConfigPath(cmd.configFile);
    }

    if(cmd.file) {
        taskConfig.setConfig('compileFile', cmd.file);
    }

    if(cmd.directory) {
        taskConfig.setConfig('directory', cmd.directory);
    }

    //run compile
    tryjs();
}

exports.run = run;