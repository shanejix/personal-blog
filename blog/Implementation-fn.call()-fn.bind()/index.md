---
title: Implementation fn.call() fn.bind()
date: '2019-08-09T22:12:03.284Z'
tags: ["javascript"]
---



### fn.call()

```
function.call(thisArg, arg1, arg2, ...)
```

`call()`干了啥

- 给函数指定this和参数并且调用
- this未指定为全局对象

比如：

```js
var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen
```

### Implementation

如何改变函数的this呢？

```js
var sData = 'display() Wisen';//not let

function display() {
    console.log('sData value is %s ', this.sData);
}

display();//sData value is display() Wisen 

//this-->Window
```

用对象包装

```js
let displayWrap = {
    sData: 'displayWrap() Wisen',
    display() {
        console.log('sData value is %s ', this.sData);
    }
}

displayWrap.display()//sData value is displayWrap() Wisen 

//this-->displayWrap
```

是不是豁然开朗



如何实现？

```js
Function.prototype.myCall = function (thisArg, ...args) {

    //1.将当前函数（this）设置为thisArg对象的属性（修改当前函数（this）的this为thisArg）

    //2.执行该函数

    //3.删除该函数
}
```

简版实现

```js
Function.prototype.myCall = function (thisArg, ...args) {

    //1.将当前函数（this）设置为thisArg对象的属性

        //校验thisArg
        thisArg = thisArg ? Object(thisArg) : Window
        //保证属性名的唯一性
        const fn = Symbol('fn');
        //绑定
        thisArg[fn] = this;

    //2.执行该函数

        //传参
        let res = thisArg[fn](...arg);


    //3.删除该函数

        //回收
        Reflect.deleteProperty(thisArg, fn) // 等同于 delete ctx[fn]
        //返回
        return res
}
```



### fn.bind()

```
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

这不跟call一样吗？打住

> The `**bind()**` method creates a new function

这是和call的唯一区别：**返回一个函数**

### Implementation

 Does not work with `new`

```js
Fucntion.prototype.mybind = function (thisArg, ...args) {

    //this:obj.mybind()->obj

    return () => {
        //this:obj
        return this.call(thisArg, ...args);
    }
}
```

没错！这就完了，需要注意利用了箭头函数的this是上级作用域中的this

 Does  work with `new`

```js
Fucntion.prototype.mybind = function (thisArg, ...args) {

    let that = this;

    //判断当前函数是否是构造函数
    let bound = function () {
        if (this instanceof bound) {
            return that.call(this, ...args);
        } else {
            return that.call(context, ...args);
        }
    }

    // 维护原型关系
    if (this.prototype) {
        bound.prototype = this.prototype;
    }

    return bound;
}
```



然后贴一个MDN的实现：

```js
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) {
    (function () {

        var slice = Array.prototype.slice.call.bind(Array.prototype.slice);

        Function.prototype.bind = function () {

            var thatFunc = this, thatArg = arguments[0];

            var args = slice(arguments, 1);

            if (typeof thatFunc !== 'function') {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError('Function.prototype.bind - ' +
                    'what is trying to be bound is not callable');
            }

            return function () {

                var funcArgs = args.concat(slice(arguments))

                return thatFunc.apply(thatArg, funcArgs);

            };
        };
    })();
}
```