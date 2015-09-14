/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/14 16:23
 */
function test() {
    try {
        return 123;
    } catch (e) {
        var file = 'demo5.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
}

function fn2() {
    try {
        alert(1);
    } catch (e) {
        var file = 'demo5.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename, fn2);
        throw new Error('FUNC_ERROR@@fn2' + e.name);
    }
}

function fn3() {
    try {
        alert(3);
    } catch (e)
                {
            var file = 'demo5.js';
            var filename = typeof module === 'undefined' ? file : module && module.filename;
            console.log('FUNCTION_ERROR@@', e, filename, fn3);
            throw e;
        }
}