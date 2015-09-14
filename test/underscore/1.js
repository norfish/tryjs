/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/14 12:00
 */


function test() {
    try {
        var a = '12';
        console.error('1123');
    } catch (e) {
        var file = '1.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
}