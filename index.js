/**
 * 
 * @desc 
 * @authors yongxiang.li (yongxiang.li@qunar.com)
 * @date    2015-05-11 18:54:55
 * @version $Id$
 */

var fs = require('fs'),
	UglifyJS = require('uglify-js2'),
	path = require('path'),
	Q = require('q');

console.log('read');

var q = Q.fcall(function(){
	return 10;
});

q.then(function(val){
	console.log(val);
	return 20;
});

q.then(function(val){
	console.log(val);
});

fs.readFile('./test/test.js', function(err, content){
	content = content.toString();

	var ast = UglifyJS.parse(content);
  var top_level = ast.figure_out_scope();
});

var code = "function foo() {\n\
  function x(arg1, arg2){ var num = 2; var price = 200; var totol; totol = num * price; return totol;}\n\
  var fn = function(a, b){ return a + b;}\n\
}\n\
function bar() {}";

var toplevel = UglifyJS.parse(code);
var walker = new UglifyJS.TreeWalker(function(node){

  if (node instanceof UglifyJS.AST_Lambda) {
    node.end.value = 'console.log(11111);';
    if(node instanceof UglifyJS.AST_Accessor) {
      console.log(UglifyJS.string_template("Found Setter/Getter function define at {line},{col}", {
        name: 'anoy',
        line: node.start.line,
        col: node.start.col
      }));
    } else if(node instanceof UglifyJS.AST_Function) {
      console.log(UglifyJS.string_template("Found function expression define at {line},{col}", {
        name: 'anoy',
        line: node.start.line,
        col: node.start.col
      }));
    } else if(node instanceof UglifyJS.AST_Defun) {
      node.end.value = 'console.log(123456);' + node.end.value;
      console.log(UglifyJS.string_template("Found function expression define at {line},{col}", {
        name: node.name.name,
        line: node.start.line,
        col: node.start.col
      }));
    }

    // string_template is a cute little function that UglifyJS uses for warnings

  }

});
toplevel.walk(walker);

var print = toplevel.print_to_string();

console.log('#####print####', print);

