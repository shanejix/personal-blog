---
title: JavaScript Inherited
date: '2019-08-09T22:12:03.284Z'
tags: ["javascript"]
---



### Inherited

#### 一， 原型链

ECMAScript继承主要是依靠原型链来实现

**构造函数，原型对象，实例**

构造函数，原型对象，实例对象的关系：

- 构造函数都有一个原型对象`prototype`
- 原型对象包含一个指向构造函数的指针`constructor`
- 实例对象包含一个指向原型对象的内部指针`[[prototype]]`-`__proto__`

让原型对象等于另一个类型的实例，会发生什么？

- 此时，原型对象包含指向另一个原型的指针
- 另一个原型中也包含一个指向另一个构造函数的指针
- 假如，另一个原型又是另一个类型的实例
  - 如此层层递进——构成了**原型链**

**搜索机制**

通过实现原型链，本质上扩展了原型的搜索机制：

- 先在实例中搜索该属性
- 没有找到继续搜索实例的原型
- 沿着原型链继续向上搜索
- 找不到属性和方法的情况下，搜索到原型链末尾停止

**默认的原型**

- 所有引用类型都默认继承了`Object`——通过原型链实现
  - 所有自定义类型都会继承`toStringa()`,`valueOf()`等默认方法的根本原因

**原型和实例的关系**

使用`instanceof()`

```javascript
alert(instance instanceof Object); //true
alert(instance instanceof SuperType); //true
alert(instance instanceof SubType); //true

```

使用`isPrototypeOf()`

```javascript
alert(Object.prototype.isPrototypeOf(instance)); //true
alert(SuperType.prototype.isPrototypeOf(instance)); //true
alert(SubType.prototype.isPrototypeOf(instance)); //true

```

**注意**

1. 谨慎定义方法

   场景：子类型需要重写超类型的某个方法；需要添加超类型中不存在的方法

   **给原型添加方法一定要放在替换原型的语句之后**

   ```javascript
   function SuperType(){
   	this.property = true;
   }
   SuperType.prototype.getSuperValue = function(){
   	return this.property;
   };
   function SubType(){
   	this.subproperty = false;
   }
   //继承了SuperType
   SubType.prototype = new SuperType();
   //添加新方法
   SubType.prototype.getSubValue = function (){
   	return this.subproperty;
   };
   //重写超类型中的方法
   SubType.prototype.getSuperValue = function (){
   	return false;
   };
   var instance = new SubType();
   alert(instance.getSuperValue()); //false
   
   ```

   **通过原型链实现继承时，不能使用对象字面量创建原型方法,因为这样做会重写原型链**

   ```javascript
   function SuperType(){
   this.property = true;
   }
   SuperType.prototype.getSuperValue = function(){
   	return this.property;
   };
   function SubType(){
   	this.subproperty = false;
   }
   //继承了SuperType
   SubType.prototype = new SuperType();
   //使用字面量添加新方法，会导致上一行代码无效
   SubType.prototype = {//现在的原型包含的是一个Object 的实例，而非SuperType 的实例，
       //原型链已经被切断——SubType 和SuperType 之间已经没有关系了
       getSubValue : function (){
           return this.subproperty;
       },
       someOtherMethod : function (){
           return false;
       }
   };
   var instance = new SubType();
   alert(instance.getSuperValue()); //error!
   
   ```

2. 原型链的问题

   问题一：

   包含引用类型值的原型属性会被所有实例共享

   - 在构造函数中，而不是在原型对象中定义属性的原因

   通过原型来实现继承时，

   - **原型实际上会变成另一个类型的实例**
   - **原先的实例属性也就变成了现在的原型属性了**

   ```javascript
   function SuperType(){
   	this.colors = ["red", "blue", "green"];
   }
   function SubType(){
   }
   //继承了SuperType
   SubType.prototype = new SuperType();
   
   var instance1 = new SubType();
   instance1.colors.push("black");
   alert(instance1.colors); //"red,blue,green,black"
   var instance2 = new SubType();
   alert(instance2.colors); //"red,blue,green,black"
   
   //SuperType 构造函数定义了一个colors 属性，该属性包含一个数组（引用类型值）
   //SuperType 的每个实例都会有各自包含自己数组的colors 属性
   //当SubType 通过原型链继承了SuperType 之后，SubType.prototype 就变成了SuperType 的一个实例
   //因此它也拥有了一个它自己的colors 属性
   //就跟专门创建了一个SubType.prototype.colors 属性一样
   //结果是SubType 的所有实例都会共享这一个colors 属性
   ```

   问题二：

   在创建子类型的实例时，不能向超类型的构造函数中传递参数

   - 是没有办法在不影响所有对象的实例的情况下，给超类型的构造函数中传递参数
   - 实践中，很少单独使用原型链

   

#### 二，借用构造函数

解决原型中包含引用类型值所带来的问题

- 借用构造函数（伪造对象or经典继承）——（思想）**在子类型的构造函数的内部调用超类型构造函数**
- `apply()`,`call()`

```javascript
function SuperType(){
	this.colors = ["red", "blue", "green"];
}
function SubType(){
    //继承了SuperType
    SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green"

//实际上是在（未来将要）新创建的SubType 实例的环境下调用了SuperType 构造函数
//这样一来，就会在新SubType 对象上执行SuperType()函数中定义的所有对象初始化代码
//结果，SubType 的每个实例就都会具有自己的colors 属性的副本了
```

1. 传递参数

   相对于原型链，借用构造函数的优势——**在子类型的构造函数中向超类型构造函数传递参数**

   ```javascript
   function SuperType(name){
   	this.name = name;
   }
   function SubType(){
       //继承了SuperType，同时还传递了参数
       SuperType.call(this, "Nicholas");
       //实例属性
       this.age = 29;
   }
   var instance = new SubType();
   alert(instance.name); //"Nicholas";
   alert(instance.age); //29
   
   //为了确保SuperType 构造函数不会重写子类型的属性，
   //可以在调用超类型构造函数后，再添加应该在子类型中定义的属性
   ```

2. 借用构造函数的问题

   缺陷——

   - **方法都在构造函数中定义**（函数复用问题）
   - 超类型的原型中定义的方法，对子类型是不可见的
   - 很少单独使用



#### 三，**组合继承**

将**原型链**和**借用构造函数**的技术**组合**到一起——

- **使用原型链实现对原型属性和方法的继承**
- **通过借用构造函数实现实例属性的继承**

**即通过在原型上定义方法实现了函数复用，又能够保证每个实例都有自己的属性**

```javascript
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(name, age){
    //继承属性
    SuperType.call(this, name);
    
    this.age = age;
}

//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
	alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27

```

> 组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为JavaScript 中最常用的继
> 承模式。而且，instanceof 和isPrototypeOf()也能够用于识别基于组合继承创建的对象



#### 四，原型式继承

思想：借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型

```javascript
function object(o){//object()对传入其中的对象执行了一次浅复制
    
	function F(){}
    
    F.prototype = o;
    
    return new F();
    
}

```

**实际上相当于又创建了`o`对象的副本**

ECMAScript 5 通过新增Object.create()方法规范化了原型式继承

两个参数：

- 一个用作新对象原型的对象
- 和（可选的）一个为新对象定义额外属性的对象。

在传入一个参数的情况下，Object.create()与object()方法的行为相同

```javascript
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"

```

第二个参数与Object.defineProperties()方法的第二个参数格式相同：

- 每个属性都是通过自己的描述符定义的
- 以这种方式指定的任何属性都会覆盖原型对象上的同名属性

```javascript
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = Object.create(person, {
    name: {
    	value: "Greg"
    }
});

alert(anotherPerson.name); //"Greg"

```



#### 五，寄生式继承

寄生式继承的思路与寄生构造函数和工厂模式类似：

- 即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，
- 最后再像真地是它做了所有工作一样返回对象

```javascript
function createAnother(original){
    
    var clone = object(original); //通过调用函数创建一个新对象
    
    clone.sayHi = function(){ //以某种方式来增强这个对象
    	alert("hi");
    };
    
	return clone; //返回这个对象
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"

```

使用寄生式继承来为对象添加函数，由于不能做到函数复用而降低效率(和构造函数模式类似）



#### **六. 寄生组合方式**

组合继承是JavaScript 最常用的继承模式：

但是，也有缺陷：无论什么情况下，都会**调用两次超类型构造函数**：

- 一次是在创建子类型原型的时候，
- 另一次是在子类型构造函数内部

```javascript
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};


function SubType(name, age){
    SuperType.call(this, name); //第二次调用SuperType()
    this.age = age;
}

SubType.prototype = new SuperType(); //第一次调用SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};
```

**寄生组合式继承**

- 通过借用构造函数来继承属性，
- 通过原型链的混成形式来继承方法

基本思路：

- 不必为了指定子类型的原型而调用超类型的构造函数，
  - 所需要的无非就是超类型原型的一个副本而已
  - 本质上，就是**使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型**

```javascript

function inheritPrototype(subType, superType){//子类型构造函数和超类型构造函数
    //创建超类型原型的一个副本
    var prototype = object(superType.prototype); 
    //增强对象,弥补因重写原型而失去的默认的 constructor 属性
    prototype.constructor = subType;
    //指定对象
    subType.prototype = prototype; 
}

```

```javascript
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
};


function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function(){
    alert(this.age);
};

```

> 高效率体现在:
>
> 只调用了一次SuperType 构造函数，
>
> 并且因此**避免了在SubType.prototype 上面创建不必要的、多余的属性**
>
> 与此同时，原型链还能保持不变；
>
> 因此，还能够正常使用instanceof 和isPrototypeOf()。

**开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式**



#### 小结

- 原型链继承
- 借用构造函数继承
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合继承（组合继承优化：基于原型式和寄生式继承）