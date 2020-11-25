---
  title: 'exports and module.exports '
  date: '2019-08-09T12:51:58Z'
  update: '2019-08-09T12:51:58Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/6'
  tags: ["Express"]
---

### difference

 exports 和 module.exports 的区别：

- module.exports 初始值为一个空对象 {}

- exports 是指向的 module.exports 的引用

- require() 返回的是 module.exports 而不是 exports



### Node.js doc

```js
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // Module code here. In this example, define a function.
    function someFunc() {}
    exports = someFunc;
    // At this point, exports is no longer a shortcut to module.exports, and
    // this module will still export an empty default object.
    module.exports = someFunc;
    // At this point, the module will now export someFunc, instead of the
    // default object.
  })(module, module.exports);
  return module.exports;
}
```

https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_module_exports

**exports = module.exports = {...}**

```js
exports = module.exports = {...}
```

等价于:

```js
module.exports = {...}
                  
exports = module.exports
      
//module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，
 
//那么通过 exports = module.exports 让 exports 重新指向 module.exports
```

