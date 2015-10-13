/**
 *
 * create by yongxiang.li
 */

var fileWalk = require('./libs/fileWalk');
var parse = require('./libs/parse');
var path = require('path');

var IO = require('./libs/utils.js').IO;

var Tryjs = function(){
    fileWalk(null, function(err, source, filePath) {
        if(err){
            var msg = '解析'+ filePath +'出现错误';
            throw new Error(msg);
        }

        var _parsed = parse(source, filePath);

        try{
            IO.write(filePath, _parsed);
            console.log('##Transform', path.basename(filePath), ' success');
        } catch(e) {
            throw e;
            console.log('##Transform', path.basename(filePath), ' fail');
        }
    });
};

module.exports = Tryjs;
