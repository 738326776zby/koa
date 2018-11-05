/**
 * Created by Administrator on 2018/3/17 0017.
 */

class Db {

    static getInstance(){   /*单例*/

        if(!Db.instance){

            Db.instance=new Db();
        }
        return Db.instance;
    }

    constructor(){

        console.log('实例化会触发构造函数');

        this.connect();
    }

    connect(){

        console.log('连接数据库');
    }
    find(){
        console.log('查询数据库');
    }
}

var myDb=Db.getInstance();


var myDb2=Db.getInstance();


var myDb3=Db.getInstance();


var myDb4=Db.getInstance();

myDb3.find();

myDb4.find();