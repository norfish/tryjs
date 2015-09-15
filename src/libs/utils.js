/**
 * Description: Utils function
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/8/25 19:11
 */

var fs = require('fs');
var cjson = require('cjson');
var path = require('path');

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

        Throw: function(param) {
            return {
                type: 'ThrowStatement',
                argument: param
            };
        },

        New: function(callee, param) {
            return {
                type: 'NewExpression',
                callee: callee,
                arguments: param
            }
        },

        Error: function() {
            return this.Identifier('Error');
        },

        Literal: function(val) {
            return {
                type: 'Literal',
                value: val
            }
        },

        PlusExpression: function(left, right) {
            return {
                type: 'BinaryExpression',
                operator: '+',
                left: left,
                right: right
            };
        },

        MemberExpression: function(obj, prop){
            return {
                type: 'MemberExpression',
                object: obj,
                property: prop,
                computed: false
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
        readJSON: function(file){
            try{
                return Utils.path.isFile(file) ? cjson.load(file) : {};
            } catch(e) {
                var msg = '请确认'+ file +'是正确的 JSON 文件';
                throw new Error(msg);
            }
        }
    },

    path: {
        getFileName: function(module, filename) {
            return module.filename || this.getBasename(filename);
        },

        getBasename: function(p) {
            return path.basename(p);
        },

        isFile: function(file) {
            try{
                return fs.statSync(file).isFile();
            } catch(err) {
                if(err.code === 'ENOENT') {
                    return false;
                } else {
                    throw err;
                }
            }
        },

        isDirectory: function(file) {
            try{
                return fs.statSync(file).isDirectory();
            } catch(err) {
                if(err.code === 'ENOENT') {
                    return false;
                } else {
                    throw err;
                }
            }
        }

    }
};

module.exports = Utils;