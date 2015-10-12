/**
 * Description: read and set config
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/8/25 20:39
 */

var Utils = require('./utils.js');
var _ = require('lodash');
var path = require('path');

var cwd = process.cwd();

var configPath = path.join(cwd, 'tryjs.config');

var defaults = {
    include: '.js', //包含的文件类型
    ignoreFiles: '', //忽略的文件
    ignoreFolders: '', //忽略的文件夹
    compileFile: '', //指定编译的文件
    directory: path.join(cwd), //指定编译的文件夹
    output: '', 、、
    errHandler: 'ErrorHandler' //错误处理函数名
};

var parsed = null; //处理后的 config

//更改 config 文件路径，路径更改同时重新解析 config 文件
exports.setConfigPath = function(file) {
    configPath = path.join(cwd, file);
    var configJSON = Utils.IO.readJSON(configPath);
    parsed = _.extend(defaults, configJSON);
};

/**
 * read config file and get config object
 * @returns {*}
 */
exports.getConfig = function(){
    if(!parsed) {
        var configJSON = Utils.IO.readJSON(configPath);
        parsed = _.extend(defaults, configJSON);
    }
    return parsed;
};

/**
 * set config file's path
 * @param {string|object} key
 * @param {string} val
 */
exports.setConfig = function(key, val) {
    exports.getConfig();
    var obj = {};
    if(typeof key === 'object'){
        obj = key;
    } else {
        obj[key] = val;
    }
    parsed = _.extend(parsed, obj);
};
