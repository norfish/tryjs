/**
 * Description: get all files that matches in config directory
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/8/25 20:25
 */

var fs = require('fs');
var path = require('path');
var taskConfig = require('./taskConfig.js');
var Utils = require('./utils.js');

var fileLists = [],
    CONFIG;

/**
 * 遍历所有需要编译的的文件
 * @param dir
 * @param callback
 */
function walk(dir, callback) {

    var fileLists = getFileList(dir);
    fileLists.forEach( function(filePath){
        var code = fs.readFileSync(filePath, 'utf-8');
        callback.call(null, null, code.toString(), filePath);
    });
}

/**
 * 获取需要编译的文件集合
 * @param dir
 * @returns {Array}
 */
function getFileList(dir) {
    CONFIG = taskConfig.getConfig();

    //如果指定了文件，就不需要遍历了
    if(CONFIG.compileFile) {
        fileLists.push(CONFIG.compileFile);
        return fileLists;
    }

    if(!dir) {
        dir = CONFIG.directory;
    }

    var dirs = fs.readdirSync(dir);

    dirs.forEach(function(item) {
        var _path = path.join(dir, item);
        if( Utils.path.isFile(_path) ){
            shouldIncludeFile( _path ) && fileLists.push( _path )
        } else if( Utils.path.isDirectory(_path)  ){
            shouldIncludeDir( _path ) && getFileList( _path );
        }
    });

    return fileLists;
}

function shouldIncludeDir(file) {
    var base = path.basename(file);
    return CONFIG.ignoreFolders.indexOf(base) < 0;
}

function shouldIncludeFile(file) {
    return !isIgnoreFile(file) && isIncludeExt(file);
}

//是否属于配置的文件类型
function isIncludeExt(file) {
    var ext = path.extname(file);
    return ext && CONFIG.include.indexOf( ext ) > -1;
}

//忽略的文件
function isIgnoreFile(src) {
    src = path.basename(src);
    return CONFIG.ignoreFiles.indexOf(src) > -1;
}

module.exports = walk;



