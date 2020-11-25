---
  title: 'Implementation express'
  date: '2019-08-09T12:57:05Z'
  update: '2019-08-09T12:57:05Z'
  comments: 0
  url: 'https://api.github.com/repos/shanejixx/shanejixx.github.io/issues/8'
  tags: ["Express"]
---

### Express

express的核心之一

路由管理：框架根据前台请求的URL执行对应的处理函数

问题：如何管理URL（path）和对应的处理函数（fn）？

- 数组？
- 对象？

### Implementation

基于发布订阅实现路由管理

```js
let http = require('http')

//路由管理容器
let router = []

//订阅：路由
router.push(
    //基于对象包装path和相应路由处理函数
    {
        path: '*',
        fn: (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('404');
        }
    },
    {
        path: '/',
        fn: (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('hello world');
        }
    },
)

//基于node的http模块创建服务
http.createServer((req, res) => {
    //监听：遍历router数组，匹配路由通知执行相应路由函数
    for (let i = 0; i < router.length; i++) {
        if (router[i].path === req.url) {
            return router[i].fn(req, res)
        }
    }
    //没有匹配到默认返回router[0]
    return router[0].fn(req, res)

}).listen(8000)
```

实现application.js

```js
let http = require('http')


function Application() {
    //路由管理容器，挂载到实例上
    this.router = [
        //第0项默认匹配所有
        {
            path: '*',
            fn: (req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('404');
            }
        }
    ]
}

//订阅路由
Application.prototype.use = (path, fn) => {
    this.router.push({ path, fn })
}


//监听路由
Application.prototype.listen = () => {
    let that = this

    http.createServer((req, res) => {
        //监听：遍历router数组，匹配路由通知执行相应路由函数
        for (let i = 0; i < router.length; i++) {
            if (router[i].path === req.url) {
                return that.router[i].fn(req, res)
            }
        }
        //没有匹配到默认返回router[0]
        return that.router[0].fn(req, res)

    }).listen(8000)
}

```

index.js

```js
let Application = require('./application')

let createApplication = function () {
    //实例化application，并返回
    return new Application()
}

//模仿express，暴露一个函数
module.exports = createApplication();
```

### Layer

为了提高效率，将路径相同（path）请求方式不同的路由整合成一组抽象为Layer（层）

layer包含

- path
- handle(fn)

### Implementation

layer.js

```js
function Layer(path, fn) {
    //当前path和fn
    this.path = path
    this.handle = fn
}

//匹配路径:当前this.path和上级path
Layer.prototype.math = (path) => {
    if (this.path === path) {
        return true
    }
    return false
}
//处理路由匹配函数fn
Layer.prototype.handleFn = (req, res) => {
    if (this.handle) {
        this.handle(req, res)
    }
}

module.exports = Layer;
```

application.js响应的变化

```js
let http = require('http')
let Layer = require('./layer')

function Application() {
    //路由管理容器，挂载到实例上
    this.router = [
        //第0项默认匹配所有
        //简化
        new Layer(
            '*',
            (req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('404');
            }
        )
    ]
}

//订阅路由
Application.prototype.use = (path, fn) => {
    this.router.push(
        new Layer(
            path,
            fn
        )
    )
}


//监听路由
Application.prototype.listen = () => {
    let that = this

    http.createServer((req, res) => {
        //监听：遍历router数组，匹配路由通知执行相应路由函数
        for (let i = 0; i < router.length; i++) {
            //简化
            if (router[i].match(req.url)) {
                return that.router[i].handleFn(req, res)
            }
        }
        //没有匹配到默认返回router[0]
        return that.router[0].handleFn(req, res)

    }).listen(8000)
}

```

### Router

express中的router负责处理所有的路由

抽象：Router组件包含若干Layer（层）

### Implementation

router/index.js

```js
let Layer = require('./layer')

function Router() {
    //路由管理容器，挂载到实例上
    this.queue = [
        //第0项默认匹配所有
        //简化
        new Layer(
            '*',
            (req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('404');
            }
        )
    ]
}

//订阅路由
Router.prototype.use = (path, fn) => {
    this.queue.push(
        new Layer(
            path,
            fn
        )
    )
}

//监听路由
Router.prototype.listen = (req, res) => {
    let that = this

    //监听：遍历router数组，匹配路由通知执行相应路由函数
    for (let i = 0; i < queue.length; i++) {
        //简化
        if (queue[i].match(req.url)) {
            return that.queue[i].handleFn(req, res)
        }
    }
    //没有匹配到默认返回router[0]
    return that.queue[0].handleFn(req, res)
}

module.export = Router;

```

application.js相应变化

```js
let http = require('http')
let Router = require('./router')

function Application() {
    //路由管理容器，挂载到实例上
    this.router = new Router()
}

//订阅路由
Application.prototype.use = (path, fn) => {
    return this.router.push(path, fn)
}


//监听路由
Application.prototype.listen = () => {
    let that = this

    http.createServer((req, res) => {
        this.router.listen(req, res)

    }).listen(8000)
}

modul.export = Application;
```

### Route

管理路由具体信息：将路径相同（path）请求方式（method）不同路由归为一组

### Implementation

```js
//借用item实现item
let Item = require('./item')

//定义Route类
function Route(path) {
    this.path = path
    this.queue = []

    this.methods = {}
}

//当前是否存在method
Route.prototype.method = function (method) {
    let name = method.toLowerCase();
    return Boolean(this.methods[name]);
};

//订阅method：get
Route.prototype.get = function (fn) {
    let item = new Item('/', fn);
    item.method = 'get';

    this.methods['get'] = true;
    this.queue.push(item);

    return this;
};

//监听method
Route.prototype.dispatch = function (req, res) {
    let self = this
    let method = req.method.toLowerCase();

    for (let i = 0, len = self.queue.length; i < len; i++) {
        if (self.queue[i].match(method)) {
            return self.queue[i].handleFn(req, res);
        }
    }
};
```

router/index.js

```js
let Layer = require('./layer')
let Route = require('./route')

function Router() {
    //路由管理容器，挂载到实例上
    this.queue = [
        //第0项默认匹配所有
        //简化
        new Layer(
            '*',
            (req, res) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('404');
            }
        )
    ]
}

//挂载route
Router.prototype.route = (path) => {
    let route = new Route(path);
    let layer = new Layer(path, function (req, res) {
        route.listen(req, res)
    });

    layer.route = route;
    this.queue.push(layer);

    return route;
};

//订阅路由:实现get方法
Router.prototype.get = (path, fn) => {
    let route = this.route(path);
    route.get(fn);
    return this;
};

//监听路由
Router.prototype.listen = (req, res) => {
    let that = this
    let method = req.method

    //监听：遍历router数组，匹配路由通知执行相应路由函数
    for (let i = 0; i < that.queue.length; i++) {
        //简化
        if (queue[i].match(req.url)) {
            return that.queue[i].handleFn(req, res)
        }
    }
    //没有匹配到默认返回router[0]
    return that.queue[0].handleFn(req, res)
}

module.export = Router;

```

application.js

```js
let http = require('http')
let Router = require('./router')

function Application() {
    //路由管理容器，挂载到实例上
    this.router = new Router()
}

//挂载route
Application.prototype.route = (path) => {
    return this.router.route(path)
}

//订阅路由
// Application.prototype.use = (path, fn) => {
//     return this.router.push(path, fn)
// }

Application.prototype.get = (path, fn) => {
    let router = this.router
    return router.get(path, fn)
}

//监听路由
Application.prototype.listen = () => {
    let that = this

    http.createServer((req, res) => {
        this.router.listen(req, res)

    }).listen(8000)
}

modul.export = Application;
```

关系：application、router、route、layer

