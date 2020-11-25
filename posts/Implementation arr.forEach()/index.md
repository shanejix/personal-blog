---
  title: 'Implementation arr.forEach()'
  date: '2019-07-21T15:44:20Z'
  update: '2019-08-02T10:01:35Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/2'
  tags: ["JavaScript"]
---

Implementation arr.forEach()

```js
Array.prototype.myForEach = function (cb, thisArg) {
    
    if (this == null) {
        throw new TypeError(' this is null or not defined');
    }
    
    if (typeof cb !== "function") {
        throw new TypeError(callback + ' is not a function');
    }
    
    let that = Window;
    if (arguments.length > 1 && thisArg!=null&& thisArg!=undefined) {
        that = thisArg;
    }
    
    let len = this.length;

    for (let i = 0; i < len; i++){
        cb.call(that,this[i],i,this)
    }
}
```

