/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/7/20 18:32
 */

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var Q = require('q');

var walk = require('./lib/walk.js');
var compile = require('./lib/compile.js');

/**
 * input file
 * get options
 * parse
 * gennerate
 * write
 */

function run(cmd, options) {
  if(typeof cmd === 'function') {
    cmd.call(this, options);
  } else {
    console.log('sorry, please make sure there is command called ' + cmd );
  }
}

exports.run = run;
