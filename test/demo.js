/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/10/12 15:23
 */



function fnc(a, b, fnt) {
    try {
        var am = a;
    } catch (e) {
        var file = 'demo.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename, fnc);
        Handler;
        throw e;
    }
}
