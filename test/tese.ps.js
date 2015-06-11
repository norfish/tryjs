function fn(a, b) {
    try {
        var sum;
        sum = a + b - 2;
        return sum;
    } catch (e) {
        var line = 1;
        var col = 0;
        var file = "./test/test.js";
        console.log("FUNCTION_ERROR@@", line, col, file);
        logError(line, col, file);
    }
}

var fn2 = function(msg) {
    try {
        alert("message" + msg);
    } catch (e) {
        var line = 7;
        var col = 10;
        var file = "./test/test.js";
        console.log("FUNCTION_ERROR@@", line, col, file);
        logError(line, col, file);
    }
};

var fn3 = function(j, k, m) {
    try {
        if (!j) {
            return;
        }
        if (k == 3) {
            fn(k, m);
        }
    } catch (e) {
        var line = 11;
        var col = 10;
        var file = "./test/test.js";
        console.log("FUNCTION_ERROR@@", line, col, file);
        logError(line, col, file);
    }
};

try {
    var b = "name";
} catch (e) {
    var line = node.line;
    var col = node.col;
    var name = node.name;
    console.log("e", e);
}