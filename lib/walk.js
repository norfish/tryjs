/**
 * 获取目录下的所有文件
 *
 */

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var CONFIG = require('./../config/tryjs.config.js');

var fileLists = [];

/**
 * 获取指定目录所有符合条件的文件
 * @param dir
 * @returns {Array}
 */
function walk(dir){
  if(!dir) {
    dir =  path.join(process.cwd());
  }
  var dirs = fs.readdirSync(dir);
  dirs.forEach(function(item) {
    var _path = path.join(dir, item);
    if(fs.statSync(_path).isFile() ){

      shouldIncludeFile( _path ) && fileLists.push( _path )
    } else if(fs.statSync(_path).isDirectory() ){
      shouldIncludeDir( _path ) && walk( _path );
    }
  });
  return fileLists;
}

function shouldIncludeDir(src) {
  src = path.basename(src);
  return CONFIG.ignoreFolders.indexOf(src) < 0;
}

function shouldIncludeFile(src) {
  return !isIgnoreFile(src) && isIncludeExt(src);
}

function isIncludeExt(src) {
  return CONFIG.ext.indexOf( path.extname(src) ) > -1;
}

function isIgnoreFile(src) {
  src = path.basename(src);
  return CONFIG.ignoreFiles.indexOf(src) > -1;
}

module.exports = walk;


