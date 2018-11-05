/**
 * Created by Administrator on 2018/3/17 0017.
 */
//es5中的类和静态方法
//
//    function Person(name,age) {
//        //构造函数里面的方法和属性
//        this.name=name;
//        this.age=age;
//        this.run=function(){
//            console.log(`${this.name}---${this.age}`)
//        }
//    }
//    //原型链上面的属性和方法可以被多个实例共享
//    Person.prototype.sex='男';
//    Person.prototype.work=function(){
//        console.log(`${this.name}---${this.age}---${this.sex}`);
//    }
//    //静态方法
//    Person.setName=function(){
//        console.log('静态方法');
//    }
//    var p=new Person('zhangsan','20');   /*实例方法是通过实例化来调用的，静态是通过类名直接调用*/
//    p.run();
//    p.work();
//
//    Person.setName();  /*执行静态方法*/
//





//es5继承

/*
原型链继承和对象冒充继承

 对象冒充继承:没法继承原型链上面的属性和方法

 原型链继承：可以继承构造函数里面以及原型链上面的属性和方法，实例化子类的时候没法给父类传参
* */

function  Person(name,age) {
    this.name=name;
    this.age=age;
    this.run=function(){
        console.log(this.name+'---'+this.age);
    }
}
Person.prototype.work=function(){
    console.log('work');
}

function Web(name,age){
    Person.call(this,name,age);  /*对象冒充实现继承*/
}

Web.prototype=new Person();
var w=new Web('李四',20);
w.run();
w.work();  //w.work is not a function