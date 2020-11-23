---
  title: 'Implementation arr.filter()'
  date: '2019-07-22T03:10:37Z'
  update: '2019-08-02T10:02:41Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/4'
  tags: ["JavaScript"]
---

Implementation`arr.filter()`

```js
Array.prototype.myFilter = function (cb, thisArg) {

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
    if ((cb.call(that, this[i], i, this))) {
      arr.push(this[i])
    } else {
      continue
    }
  }
  return arr;
}
```

