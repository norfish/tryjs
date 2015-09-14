/**
 * Description:获取目录下的所有文件
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/8/25 20:25
 */

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var taskConfig = require('./taskConfig.js');

var fileLists = [];

/**
 * 遍历所有需要编译的的文件
 * @param dir
 * @param callback
 */
function walk(dir, callback) {

    var fileLists = getFileList(dir);
    fileLists.forEach( function(filePath, i){

        fs.readFile(filePath, 'utf-8', function(err, buf){
            var code = buf.toString();
            callback.call(null, err, code, filePath);
        });

    });
}

/**
 * 获取需要编译的文件集合
 * @param dir
 * @returns {Array}
 */
function getFileList(dir) {
    var CONFIG = taskConfig.getConfig();

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
        if(fs.statSync(_path).isFile() ){
            shouldIncludeFile( _path ) && fileLists.push( _path )
        } else if(fs.statSync(_path).isDirectory() ){
            shouldIncludeDir( _path ) && getFileList( _path );
        }
    });
    console.log(fileLists);
    return fileLists;
}

function shouldIncludeDir(file) {
    var CONFIG = taskConfig.getConfig();
    var base = path.basename(file);
    console.log('shouldIncludeFile', base);
    return CONFIG.ignoreFolders.indexOf(base) < 0;
}

function shouldIncludeFile(file) {
    console.log('shouldIncludeFile', file, !isIgnoreFile(file), !isIgnoreFile(file) && isIncludeExt(file));
    return !isIgnoreFile(file) && isIncludeExt(file);
}

function isIncludeExt(file) {
    var CONFIG = taskConfig.getConfig();
    var ext = path.extname(file);
    return ext && CONFIG.include.indexOf( ext ) > -1;
}

function isIgnoreFile(src) {
    var CONFIG = taskConfig.getConfig();
    src = path.basename(src);
    return CONFIG.ignoreFiles.indexOf(src) > -1;
}

module.exports = walk;



