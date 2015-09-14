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
            throw new Error('解析出现错误');
        }

        var _parsed = parse(source, filePath);

        fs.writeFile(filePath, _parsed, function(err) {
            if(err){
                console.log('transform##', path.basename(filePath), 'fail');
            } else {
                console.log('transform##', path.basename(filePath), 'successed');
            }
        });

    });
};

module.exports = Tryjs;
