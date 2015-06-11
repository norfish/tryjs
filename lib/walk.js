/**
 * 获取目录下的所有文件
 *
 */

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var fileLists = [];
var _dir = path.join(process.cwd());

var IGNORE = {
  folders: ['node_modules', 'fekit_modules'],
  files: []
};

var EXT = ['.js'];

function walk(dir){
  var dirs = fs.readdirSync(dir);
  dirs.forEach(function(item) {
    var _path = path.join(dir, item);
    if(fs.statSync(_path).isFile() ){

      shouldIncludeFile( _path ) && fileLists.push( _path )
    } else if(fs.statSync(_path).isDirectory() ){
      shouldIncludeDir( _path ) && walk( _path );
    }
  });
  console.log('%s 个文件正在编译中...', fileLists.length);
  return fileLists;
}

function shouldIncludeDir(src) {
  src = path.basename(src);
  return IGNORE.folders.indexOf(src) < 0;
}

function shouldIncludeFile(src) {
  return !isIgnoreFile(src) && isIncludeExt(src);
}

function isIncludeExt(src) {
  return EXT.indexOf( path.extname(src) ) > -1;
}

function isIgnoreFile(src) {
  src = path.basename(src);
  return IGNORE.files.indexOf(src) > -1;
}

module.exports = walk;


