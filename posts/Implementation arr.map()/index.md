---
  title: 'Implementation arr.map()'
  date: '2019-07-22T03:01:19Z'
  update: '2019-08-02T10:02:10Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/3'
  tags: ["JavaScript"]
---

Implementation arr.map()

```js
Array.prototype.myMap = function (cb, thisArg) {

  if (this == null) {
    throw new TypeError(' this is null or not defined');
  }

  if (typeof cb !== "function") {
    throw new TypeError(callback + ' is not a function');
  }

  let that = Window;
  if (arguments.length > 1 && thisArg != null && thisArg != undefined) {
    that = thisArg;
  }

  let len = this.length;
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(cb.call(that, this[i], i, this));
  }
  return arr;
}
```

