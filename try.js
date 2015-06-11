/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/6/11 13:25
 */

var fs = require('fs'),
  UJS = require('uglify-js2'),
  Q = require('q'),
  mkdirp = require('mkdirp'),
  path = require('path');

var parse = require('./lib/parse.js');
var walk = require('./lib/walk.js');
var fs_readFile = Q.nfbind(fs.readFile);

function tryJS(opts) {
  opts = opts || {};

  var _path  = opts.path || path.join(process.cwd());

  var _fileLists = walk( _path );

  _fileLists.forEach(function(file) {
    fs_readFile(file)
      .then(function(err, src) {
        var _parsed = parse(src.toString());

        fs.writeFile(file, _parsed, function(err) {
          if(err){
            console.log('there is an error');
          } else {
            console.log('write successed');
          }
        });
        console.log('tranformed####', _parsed.print_to_string({ beautify: true }), '#####');
      });
  });

}

tryJS();

module.exports = tryJS;

