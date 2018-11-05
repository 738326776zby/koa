/**
 * Created by Administrator on 2018/3/17 0017.
 */

//定义Person类
//
//class Person{
//    constructor(name,age) {   /*类的构造函数，实例化的时候执行，new的时候执行*/
//        this._name=name;
//        this._age=age;
//    }
//    getName(){
//        console.log(this._name);
//
//    }
//    setName(name){
//        this._name=name
//    }
//}
//var p=new Person('张三1','20');
//p.getName();
//p.setName('李四');
//p.getName();



//es6里面的继承
    //
    //class Person{
    //    constructor(name,age){
    //        this.name=name;
    //        this.age=age;
    //    }
    //    getInfo(){
    //        console.log(`姓名:${this.name} 年龄:${this.age}`);
    //    }
    //    run(){
    //        console.log('run')
    //    }
    //}
    //class Web extends Person{  //继承了Person     extends          super(name,age);
    //    constructor(name,age,sex){
    //        super(name,age);   /*实例化子类的时候把子类的数据传给父类*/
    //        this.sex=sex;
    //    }
    //    print(){
    //
    //        console.log(this.sex);
    //    }
    //}
    //var w=new Web('张三','30','男');
    //w.getInfo();


//es6里面的静态方法

class Person{

    constructor(name){

        this._name=name;  /*属性*/
    }
    run(){  /*实例方法*/

        console.log(this._name);
    }
    static work(){   /*静态方法*/
        console.log('这是es6里面的静态方法');
    }
}
Person.instance='这是一个静态方法的属性';


var p=new  Person('张三');

p.run();
Person.work();   /*es6里面的静态方法*/

console.log(Person.instance);
