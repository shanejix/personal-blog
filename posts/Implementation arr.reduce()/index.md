---
  title: 'Implementation arr.reduce()'
  date: '2019-07-22T13:35:32Z'
  update: '2019-08-02T10:03:10Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/5'
  tags: ["JavaScript"]
---

Implementation arr.reduce()

```js
Array.prototype.myReduce = function (cb, init) {

  if (this == null) {
    throw new TypeError(' this is null or not defined');
  }

  if (typeof cb !== "function") {
    throw new TypeError(callback + ' is not a function');
  }

  let acc;
  let len = this.length;
  if (arguments.length > 1 && init != null && init != undefined) {
    acc = init;
    for (let i = 0; i < len; i++) {
      acc = cb(acc, this[i], i, this);
    }
  } else {
    acc = this[0];
    for (let i = 1; i < len; i++) {
      acc = cb(acc, this[i], i, this);
    }
  }

  return acc
}
```

