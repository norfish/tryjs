/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/14 11:31
 */


;(function func_trir_1de540d1af8413b3be72e147a3da1a2c(__context) {
    try {
        var module = {
            id: '3eab014e76bc87950932879578be9a36',
            filename: 'index.js',
            exports: {}
        };
        if (!__context.____MODULES) {
            __context.____MODULES = {};
        }
        var r = function func_trir_3c555ba2cb061b484d6e5443e76c920b(exports, module, global) {
            try {
                __context.____MODULES['352d5b4c2a666a1cf9918d96eb51eac8'];
            } catch (e) {
                var file = 'demo2.js';
                var filename = typeof module === 'undefined' ? file : module && module.filename;
                console.log('FUNCTION_ERROR@@', e, filename);
            }
        }(module.exports, module, __context);
        __context.____MODULES['3eab014e76bc87950932879578be9a36'] = module.exports;
    } catch (e) {
        var file = 'demo2.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
})(this);


;(function func_trir_3e0528ffa5932d2c852d5d57a8d4c6db(__context) {
    try {
        var module = {
            id: 'ee96cc937aba874a5186e1b435f04a79',
            filename: 'list.js',
            exports: {}
        };
        if (!__context.____MODULES) {
            __context.____MODULES = {};
        }
        var r = function func_trir_a1654c7e5da19cc6988c8a8ecb83e129(exports, module, global) {
            try {
                exports.shops = [{
                        'id': 1,
                        'name': '\u53F0\u706F',
                        'des': '\u8FD9\u662F\u4E2A\u5C0F\u53F0\u706F',
                        'store': 5,
                        'cansell': true,
                        'image': './img/light.jpg'
                    }];
            } catch (e) {
                var file = 'demo2.js';
                var filename = typeof module === 'undefined' ? file : module && module.filename;
                console.log('FUNCTION_ERROR@@', e, filename);
            }
        }(module.exports, module, __context);
        __context.____MODULES['ee96cc937aba874a5186e1b435f04a79'] = module.exports;
    } catch (e) {
        var file = 'demo2.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
})(this);


;(function func_trir_989db9aa497d890aef257be4316fef88(__context) {
    try {
        var module = {
            id: 'f14075977ed96bf3b864fca30554e699',
            filename: 'shopModel.js',
            exports: {}
        };
        if (!__context.____MODULES) {
            __context.____MODULES = {};
        }
        var r = function func_trir_e771dac891d4e7c40eb48d453a49d8eb(exports, module, global) {
            try {
                var mockData = __context.____MODULES['ee96cc937aba874a5186e1b435f04a79'];
                var ShopModel = Backbone.Model.extend({
                    defaults: {
                        name: '',
                        stock: 5,
                        cansell: true,
                        image: '',
                        price: 10
                    },
                    soldOne: function func_trir_c7f66bd48049e06bdf73f8ff395bee55() {
                        try {
                            var leftStock = this.get('stock') - 1 || 0;
                            this.save({
                                stock: leftStock,
                                cansell: !!leftStock
                            });
                            var name = this.get('name');
                            this.trigger('soldOne', {
                                name: name,
                                sold: 1
                            });
                        } catch (e) {
                            var file = 'demo2.js';
                            var filename = typeof module === 'undefined' ? file : module && module.filename;
                            console.log('FUNCTION_ERROR@@', e, filename);
                        }
                    }
                });
                module.exports = ShopModel;
            } catch (e) {
                var file = 'demo2.js';
                var filename = typeof module === 'undefined' ? file : module && module.filename;
                console.log('FUNCTION_ERROR@@', e, filename);
            }
        }(module.exports, module, __context);
        __context.____MODULES['f14075977ed96bf3b864fca30554e699'] = module.exports;
    } catch (e) {
        var file = 'demo2.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
})(this);


;(function func_trir_327b2a59130cdf4005bafbc203886bd1(__context) {
    try {
        var module = {
            id: '77085197a921f65f374b3e8f8b49d62f',
            filename: 'shopStore.js',
            exports: {}
        };
        if (!__context.____MODULES) {
            __context.____MODULES = {};
        }
        var r = function func_trir_2865a893aae8e1fd3ae848acca7baf8e(exports, module, global) {
            try {
                var ShopModel = __context.____MODULES['f14075977ed96bf3b864fca30554e699'];
                var mockData = __context.____MODULES['ee96cc937aba874a5186e1b435f04a79'];
                var ShopStore = Backbone.Collection.extend({
                    model: ShopModel,
                    localStorage: new Store('shopStore'),
                    initialize: function func_trir_c1580a7f16c2adf6ff1749b180cd1b1b() {
                        try {
                        } catch (e) {
                            var file = 'demo2.js';
                            var filename = typeof module === 'undefined' ? file : module && module.filename;
                            console.log('FUNCTION_ERROR@@', e, filename);
                        }
                    }
                });
                module.exports = ShopStore;
            } catch (e) {
                var file = 'demo2.js';
                var filename = typeof module === 'undefined' ? file : module && module.filename;
                console.log('FUNCTION_ERROR@@', e, filename);
            }
        }(module.exports, module, __context);
        __context.____MODULES['77085197a921f65f374b3e8f8b49d62f'] = module.exports;
    } catch (e) {
        var file = 'demo2.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
})(this);


;(function func_trir_dfdc2ddbb7b3d76240a68453ae310e26(__context) {
    try {
        var module = {
            id: 'd7eb2eb9d5a1971ea2e8a5ea1c7f36c1',
            filename: 'cartModel.js',
            exports: {}
        };
        if (!__context.____MODULES) {
            __context.____MODULES = {};
        }
        var r = function func_trir_95344ad998a004a0846f9a473f666d88(exports, module, global) {
            try {
                var CartModel = Backbone.Model.extend({
                    defaults: {
                        'id': 1,
                        'name': '\u53F0\u706F',
                        'number': 5,
                        'price': 100
                    },
                    sold: function func_trir_c1580a7f16c2adf6ff1749b180cd1b1b() {
                        try {
                        } catch (e) {
                            var file = 'demo2.js';
                            var filename = typeof module === 'undefined' ? file : module && module.filename;
                            console.log('FUNCTION_ERROR@@', e, filename);
                        }
                    }
                });
                module.export = CartModel;
            } catch (e) {
                var file = 'demo2.js';
                var filename = typeof module === 'undefined' ? file : module && module.filename;
                console.log('FUNCTION_ERROR@@', e, filename);
            }
        }(module.exports, module, __context);
        __context.____MODULES['d7eb2eb9d5a1971ea2e8a5ea1c7f36c1'] = module.exports;
    } catch (e) {
        var file = 'demo2.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
})(this);


;(function func_trir_79ef52cb10f7d92d7e42319965314830(__context) {
    try {
        var module = {
            id: '8c4c48617a1f2de1147dd4357c689ade',
            filename: 'cartStore.js',
            exports: {}
        };
        if (!__context.____MODULES) {
            __context.____MODULES = {};
        }
        var r = function func_trir_6b2c1ccf7ca87a076e40c64434a6367b(exports, module, global) {
            try {
                var CartModel = __context.____MODULES['d7eb2eb9d5a1971ea2e8a5ea1c7f36c1'];
                var ShopStore = __context.____MODULES['77085197a921f65f374b3e8f8b49d62f'];
                var CartStore = Backbone.Collection.extend({
                    model: CartModel,
                    initialize: function func_trir_c1580a7f16c2adf6ff1749b180cd1b1b() {
                        try {
                        } catch (e) {
                            var file = 'demo2.js';
                            var filename = typeof module === 'undefined' ? file : module && module.filename;
                            console.log('FUNCTION_ERROR@@', e, filename);
                        }
                    },
                    addOne: function func_trir_29222eeb57fc9cf071deea1097171dc8(shop) {
                        try {
                        } catch (e) {
                            var file = 'demo2.js';
                            var filename = typeof module === 'undefined' ? file : module && module.filename;
                            console.log('FUNCTION_ERROR@@', e, filename);
                        }
                    }
                });
                module.exports = CartStore;
            } catch (e) {
                var file = 'demo2.js';
                var filename = typeof module === 'undefined' ? file : module && module.filename;
                console.log('FUNCTION_ERROR@@', e, filename);
            }
        }(module.exports, module, __context);
        __context.____MODULES['8c4c48617a1f2de1147dd4357c689ade'] = module.exports;
    } catch (e) {
        var file = 'demo2.js';
        var filename = typeof module === 'undefined' ? file : module && module.filename;
        console.log('FUNCTION_ERROR@@', e, filename);
    }
})(this);