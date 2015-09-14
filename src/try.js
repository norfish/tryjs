/**
 * create by yongxiang.li
 */

var fileWalk = require('./libs/fileWalk');
var parse = require('./libs/parse');
var path = require('path');
var fs = require('fs');

var Tryjs = function(){
    fileWalk(null, function(err, source, filePath) {
        if(err){
            var msg = '解析'+ filePath +'出现错误';
            throw new Error(msg);
        }

        var _parsed = parse(source, filePath);

        fs.writeFile(filePath, _parsed, function(err) {
            if(err){
                console.log('##Transform', path.basename(filePath), ' fail');
            } else {
                console.log('##Transform', path.basename(filePath), ' successe');
            }
        });

    });
};

module.exports = Tryjs;
