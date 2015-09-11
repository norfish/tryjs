/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/11 16:39
 */
var QNR = {};
QNR.Utils = {};
QNR.Utils.log = function func_trir_e0560f2993849c90e0300f6b6067558e(mes) {
    try {
        console.log(mes);
    } catch (e) {
        var file = 'vender.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
}

function Car(name) {
    try {
        this.name = name;
        this.init();
    } catch (e) {
        var file = 'vender.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
}

Car.prototype = {
    init: function func_trir_dc71be0d18296435713fcb7a1dde5f8a() {
    try {
        getStore();
        this.bindEvents();
    } catch (e) {
        var file = 'vender.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
},

    bindEvents: function func_trir_1ab1d45bd5526973ff0aa432a6d66fc1() {
    try {
        var self = this;
        window.onload = function func_trir_028ce452897a9fa280abdc2adbecec2f() {
            try {
                self.sayHello();
            } catch (e) {
                var file = 'vender.js';
                var filename = typeof module === 'undefined' ? file : module && module.filename;
                console.log('FUNCTION_ERROR@@', e, filename);
            }
        };
    } catch (e) {
        var file = 'vender.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
},

    sayHello: function func_trir_d23980de82cb41064290a778a7cfe2a7() {
    try {
        new 10();
        alert('hello' + this.name);
    } catch (e) {
        var file = 'vender.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
}
};


function getStore() {
    try {
        var stock = parseInt(100 * Math.random());
        return {
            name: 'book',
            stack: stock
        };
    } catch (e) {
        var file = 'vender.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
}


//init
var benz = new Car('Benz');
benz.sayHello();