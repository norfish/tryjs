/**
 * Description:
 * Created by yongxiang.li
 * Email yongxiang.li@qunar.com
 * Date: 15/9/14 11:31
 */


;(function(__context){
    var module = {
        id : "3eab014e76bc87950932879578be9a36" ,
        filename : "index.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

        __context.____MODULES['352d5b4c2a666a1cf9918d96eb51eac8'];


    })( module.exports , module , __context );
    __context.____MODULES[ "3eab014e76bc87950932879578be9a36" ] = module.exports;
})(this);


;(function(__context){
    var module = {
        id : "ee96cc937aba874a5186e1b435f04a79" ,
        filename : "list.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

        exports.shops = [{
            "id": 1,
            "name": "台灯",
            "des": "这是个小台灯",
            "store": 5,
            "cansell": true,
            "image": "./img/light.jpg"
        }];


    })( module.exports , module , __context );
    __context.____MODULES[ "ee96cc937aba874a5186e1b435f04a79" ] = module.exports;
})(this);


;(function(__context){
    var module = {
        id : "f14075977ed96bf3b864fca30554e699" ,
        filename : "shopModel.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

        /**
         * 可售卖商品 model
         */

        var mockData =__context.____MODULES['ee96cc937aba874a5186e1b435f04a79'];

        var ShopModel = Backbone.Model.extend({

            defaults: {
                name: '',
                stock: 5,
                cansell: true,
                image: '',
                price: 10
            },

            soldOne: function() {
                var leftStock = (this.get('stock') - 1 || 0);

                this.save({
                    stock: leftStock,
                    cansell: !!leftStock
                });

                var name = this.get('name');

                this.trigger('soldOne', {name: name, sold: 1});
            }
        });

        module.exports = ShopModel;

    })( module.exports , module , __context );
    __context.____MODULES[ "f14075977ed96bf3b864fca30554e699" ] = module.exports;
})(this);


;(function(__context){
    var module = {
        id : "77085197a921f65f374b3e8f8b49d62f" ,
        filename : "shopStore.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

        /**
         *
         */
        var ShopModel =__context.____MODULES['f14075977ed96bf3b864fca30554e699'];
        var mockData =__context.____MODULES['ee96cc937aba874a5186e1b435f04a79'];

        var ShopStore = Backbone.Collection.extend({
            model: ShopModel,

            localStorage: new Store('shopStore'),

            initialize: function() {

            },
        });

//app.ShopStore = new ShopStore();
//
        module.exports = ShopStore;

    })( module.exports , module , __context );
    __context.____MODULES[ "77085197a921f65f374b3e8f8b49d62f" ] = module.exports;
})(this);


;(function(__context){
    var module = {
        id : "d7eb2eb9d5a1971ea2e8a5ea1c7f36c1" ,
        filename : "cartModel.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

        /**
         *
         */

        var CartModel = Backbone.Model.extend({

            defaults: {
                "id": 1,
                "name": "台灯",
                "number": 5,
                "price": 100
            },

            sold: function() {

            },
        });

        module.export = CartModel;

    })( module.exports , module , __context );
    __context.____MODULES[ "d7eb2eb9d5a1971ea2e8a5ea1c7f36c1" ] = module.exports;
})(this);


;(function(__context){
    var module = {
        id : "8c4c48617a1f2de1147dd4357c689ade" ,
        filename : "cartStore.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

        /**
         *
         */

        var CartModel =__context.____MODULES['d7eb2eb9d5a1971ea2e8a5ea1c7f36c1'];
        var ShopStore =__context.____MODULES['77085197a921f65f374b3e8f8b49d62f'];

        var CartStore = Backbone.Collection.extend({
            model: CartModel,

            initialize: function() {
                //this.listendTo(ShopStore, 'addOne', this.addOne);
            },

            addOne: function(shop) {

            }
        });

//app.CartStore = new CartStore();

        module.exports = CartStore;

    })( module.exports , module , __context );
    __context.____MODULES[ "8c4c48617a1f2de1147dd4357c689ade" ] = module.exports;
})(this);