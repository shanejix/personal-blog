---
title: Observe Partern
date: '2019-08-09T22:12:03.284Z'
tags: ["javascript"]
---



开发中经常遇到观察者模式，什么是观察者模式呢？

### 生活实例—购房

故事一：购房

- A被告知售罄，遂记下售楼MM电话离去
- A每天打电话询问MM新房上线时间
- 除此之外，有B,C,D,...等每天向MM询问
- MM每天应对电话10w+，卒

故事二：购房优化

- A被告知售罄，售楼处的电话簿记录了A的电话
- B,C,D,...等也将电话记录在售楼MM的电话簿
- A,B,C,D,...每天对新房上线时间了无牵挂
- 新房上线，MM翻开电话簿逐个发送短信通知

这个例子就是一个简单的发布—订阅模式

- A,B,C,D...是订阅者，订阅房子上线的通知
- 售楼MM是发布者，会在合适的事件遍历电话簿通知订阅者

### 购房发布订阅模型

实现发布订阅模式的基本要素：

- 谁是发布者？（售楼MM）
- 谁是订阅者？（A,B,C,D...）
- 如何给发布者添加一个缓存列表，以便通知？（电话簿）=》数组
- 如何通知？（遍历电话簿，逐个发短息）=》数组遍历，逐个执行回调函数

- 如何订阅？(留下电话) =》回调函数

实现：

```js
var salesOffices = {}; // 定义售楼MM

salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function( fn ){ // 增加订阅者
    this.clientList.push( fn ); // 订阅的消息添加进缓存列表  
};

salesOffices.trigger = function(){ // 发布消息   
    for( var i = 0, fn; fn = this.clientList[ i++ ]; ){        
    	fn.apply( this, arguments ); // (2) // arguments 是发布消息时带上的参  
    }
};

salesOffices.listen( function( price, squareMeter ){ // A订阅消息
    console.log( '价格= ' + price );
    console.log( 'squareMeter= ' + squareMeter );
});

salesOffices.listen( function( price, squareMeter ){ // B订阅消息
    console.log( '价格= ' + price );
    console.log( 'squareMeter= ' + squareMeter );
});

salesOffices.trigger( 2000000, 88 ); // 输出：200 万，88 平方米
salesOffices.trigger( 3000000, 110 ); // 输出：300 万，110 平方米
```

缺点：

A只想买88 平方米的房子，但是发布者把110 平方米的信息也推送给了A

优化：

```js
var salesOffices = {}; // 定义售楼MM

salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function( key, fn ){
    if ( !this.clientList[ key ] ){ // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.clientList[ key ] = [];
    }
    this.clientList[ key ].push( fn ); // 订阅的消息添加进消息缓存列表
};

salesOffices.trigger = function(){ // 发布消息
    var key = Array.prototype.shift.call( arguments ), // 取出消息类型
    fns = this.clientList[ key ]; // 取出该消息对应的回调函数集合
    if ( !fns || fns.length === 0 ){ // 如果没有订阅该消息，则返回
    	return false;
	}
    
    for( var i = 0, fn; fn = fns[ i++ ]; ){
        fn.apply( this, arguments ); // (2) // arguments 是发布消息时附送的参数
    }
};
salesOffices.listen( 'squareMeter88', function( price ){ // A订阅88 平方米房子的消息
    console.log( '价格= ' + price ); // 输出： 2000000
});

salesOffices.listen( 'squareMeter110', function( price ){ // B订阅110 平方米房子的消息
	console.log( '价格= ' + price ); // 输出： 3000000
});

salesOffices.trigger( 'squareMeter88', 2000000 ); // 发布88 平方米房子的价格
salesOffices.trigger( 'squareMeter110', 3000000 ); // 发布110 平方米房子的价格
```

### 通用实现

将发布订阅的功能提取出来放在一个对象中

```js
var event = {
    clientList: [],
    listen: function( key, fn ){
        if ( !this.clientList[ key ] ){
        	this.clientList[ key ] = [];
    	}
    	this.clientList[ key ].push( fn ); // 订阅的消息添加进缓存列表
    },
    trigger: function(){
        var key = Array.prototype.shift.call( arguments ), // (1);
        fns = this.clientList[ key ];
        if ( !fns || fns.length === 0 ){ // 如果没有绑定对应的消息
        	return false;
   		}
        for( var i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, arguments ); // (2) // arguments 是trigger 时带上的参数
        }
    }
}

//再定义一个installEvent 函数，这个函数可以给所有的对象都动态安装发布—订阅功能

var installEvent = function( obj ){
    for ( var i in event ){
    	obj[ i ] = event[ i ];
    }
};
```

缺点：

A跟售楼处对象还是存在一定的耦合性，

至少要知道售楼处对象的名字是`salesOffices`，才能顺利的订阅到事件

### 全局发布订阅对象

发布—订阅模式可以用一个全局的Event 对象来实现，订阅者不需要了解消息来自哪个发布者，发布者也不知道消息会推送给哪些订阅者

Event 作为一个类似“中介者”的角色，把订阅者和发布者联系起来

实现：

```js
var Event = (function(){
var clientList = {},
	listen,
	trigger,
	remove;
    
	listen = function( key, fn ){
        if ( !clientList[ key ] ){
        	clientList[ key ] = [];
        }
        clientList[ key ].push( fn );
    };
    trigger = function(){
        var key = Array.prototype.shift.call( arguments ),
        fns = clientList[ key ];
        if ( !fns || fns.length === 0 ){
            return false;
        }
        for( var i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, arguments );
        }
    };
    remove = function( key, fn ){
        var fns = clientList[ key ];
        if ( !fns ){
            return false;
        }
        if ( !fn ){
        	fns && ( fns.length = 0 );
        }else{
            for ( var l = fns.length - 1; l >=0; l-- ){
            	var _fn = fns[ l ];
                if ( _fn === fn ){
                    fns.splice( l, 1 );
                }
        	}
       }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

Event.listen( 'squareMeter88', function( price ){ // 小红订阅消息
	console.log( '价格= ' + price ); // 输出：'价格=2000000'
});
Event.trigger( 'squareMeter88', 2000000 ); // 售楼处发布消息
```

### 模块间通信

基于一个全局的Event 对象，利用它可以在两个封装良好的模块中进行通信，这两个模块可以完全不知道对方的存在。就如同有了中介公司之后，不再需要知道房子开售的消息来自哪个售楼处。



### 小结

优点：

- 时间上解耦
- 对象之间解耦
- 实现异步编程