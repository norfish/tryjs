/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/8/25 19:11
 */

var fs = require('fs');

var Utils = {

    AST: {
        Block: function(body) {
            return {
                type: "BlockStatement",
                body: body
            }
        },

        Catch: function(param, body) {
            return {
                type: "CatchClause",
                param: param,
                body: body
            };
        },

        Identifier: function(param) {
            return ind = {
                type: 'Identifier',
                name: param
            };
        },

        isFunction: function(item) {
            return item.type === 'FunctionDeclaration' || item.type === 'FunctionExpression';
        },

        /**
         * 分离函数体内部的声明函数和其他
         * @param node
         * @returns {{nest: Array, normal: Array}}
         */
        splitNestFn: function(node) {
            var self = this;
            var nest = [], //内嵌的function
                normal = [];

            var fnText = node.body.body; //函数体

            fnText.forEach(function(item, i) {
                if ( self.isFunction(item) ) {
                    nest.push(item);
                } else {
                    normal.push(item);
                }
            });

            return {
                nest: nest,
                normal: normal
            };
        }

    },

    IO: {
        readJSON: function(path, callback){
            if(!path || !Utils.path.isFile(path)) {
                return callback.call(this, null, {});
            }

            fs.readFile(path, function(err, data) {
                debugger
                data = JSON.parse(data.toString());
                callback.call(this, err, data);
            });
        }
    },

    path: {
        getFileName: function(module, filename) {
            return module.filename || this.getCurPath(filename);
        },

        getCurPath: function() {
            return process.cwd();
        },

        isFile: function(file) {
            return fs.statSync(file).isFile()
        },

        isDirectory: function(file) {
            return fs.statSync(file).isDirectory()
        }

    }
};

module.exports = Utils;