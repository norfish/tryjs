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
    include: '.js',
    ignoreFiles: '',
    ignoreFolders: '',
    compileFile: '',
    directory: path.join(cwd)
};

var parsed = null;

exports.setConfigPath = function(file) {
    configPath = path.join(cwd, file);
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
 * @param {[string]} val
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
