/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/14 11:28
 */

function fn1() {
    try {
        alert('Hi,Siri');
    } catch (e) {
        var file = 'demo1.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
}

function fn2() {
    try {
    } catch (e) {
        var file = 'demo1.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
}

function fn3() {
}