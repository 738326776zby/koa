/**
 * Created by Administrator on 2018/3/16 0016.
 */

var MongoClient = require('mongodb').MongoClient;

//定义连接数据库的地址
const  dbUrl = 'mongodb://localhost:27017/';
var dbName = 'cms';

var dbClient;
class DB{

    constructor(){
        this.client='';
        this.count='1';
        this.__connect();
    }
    __connect(){
       var that=this;
       return new Promise((resolve,reject)=>{

           if(!dbClient){
               console.log('不存在');


               //连接数据库
               MongoClient.connect(dbUrl,(err,client)=>{
                   if(err){
                       console.log('数据连接失败');
                       reject(err)
                       return false;
                   }
                   dbClient=client;

                   resolve(dbClient);
               })
           }else{
               console.log('存在');
               resolve(dbClient);
           }
       })

    }
    find(json){
       return new Promise((resolve,reject)=>{
           this.__connect().then((client)=>{
               var db=client.db(dbName);
               var result=db .collection('user').find(json).limit(10);
               result.toArray(function(err,doc) {
                   if (err) {
                       reject(err);
                       return;
                   }
                   //client.close();
                   resolve(doc);
               })

           })
       })
    }
}
var db=new DB();

//console.log(db.client);





setTimeout(function(){
    console.time('start');
    db.find({}).then(function(data){
        console.timeEnd('start');
        //console.log(data);
    })
},10)

setTimeout(function(){
    console.time('start2');
    db.find({"age":777}).then(function(data){
        console.timeEnd('start2');
        //console.log(data);
    })
},30)

setTimeout(function(){
    console.time('start3');
    db.find({"name":"zhangsan333"}).then(function(data){
        console.timeEnd('start3');
        //console.log(data);
    })
},2000)

setTimeout(function(){
    console.time('start4');
    db.find({"name":"zhangsan222"}).then(function(data){
        console.timeEnd('start4');
        //console.log(data);
    })
},40)

setTimeout(function(){
    console.time('start5');
    db.find({}).then(function(data){
        console.timeEnd('start5');
        //console.log(data);
    })
},40)

setTimeout(function(){
    console.time('start6');
    db.find({}).then(function(data){
        console.timeEnd('start6');
        //console.log(data);
    })
},4000)

setTimeout(function(){
    console.time('start7');
    db.find({}).then(function(data){
        console.timeEnd('start7');
        //console.log(data);
    })
},4000)


setTimeout(function(){
    console.time('start8');
    db.find({}).then(function(data){
        console.timeEnd('start8');
        //console.log(data);
    })
},40)


//
//console.time('start1');
//db.find({}).then(function(data){
//    console.timeEnd('start1');
//    //console.log(data);
//})
//
//
//console.time('start2');
//db.find({}).then(function(data){
//    console.timeEnd('start2');
//    //console.log(data);
//})
