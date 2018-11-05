/**
 * Created by Administrator on 2017/10/23 0023.
 */


//封装操作数据库的方法


var config=require('./config.js');

var  MongoClient=require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;   /*查找_id*/
var dbUrl =config.dbUrl;
var dbName =config.dbName;



//封装连接数据库的方法
function _connect(callback){
    console.time('start1');
    MongoClient.connect(dbUrl,function(err,client){
        if(err){
            console.log('数据库连接失败');
            console.log(err);
            return;
        }

        console.timeEnd('start1');

        callback(client);

    })
}

exports.ObjectID=ObjectID;

/*
 db.find('user',{},function(err,data){
        console.log(data)
 })
* */

exports.find=function(collectionName,json){

    return new Promise(function(resolve,reject){

            _connect(function(client){
                   var db=client.db(dbName);
                   var result=db.collection(collectionName).find(json).limit(10);

                    result.toArray(function(err,data){
                        client.close();
                        if(err){
                            reject(err);
                         
                        }else{
                            resolve(data);
                        }

                    })

            
         })
    })

}

/*
 db.insert("user",{"name":"zhangsan"},function(){

 })

增加数据
* */

exports.insert=function(collectionName,json){


    return new Promise(function(resolve,reject){

        _connect(function(client){
            var db=client.db(dbName);
            db.collection(collectionName).insertOne(json, function (err, result) {
                client.close();
                if(err){
                    reject(err);

                }else{
                    resolve(result);
                }

            })

        })
    })

}

/*

db.update('user',{"id":123},{'name':"zhangsan"},function(){

})
更新数据
*
* */
exports.update=function(collectionName,json1,json2){



    return new Promise(function(resolve,reject){

        _connect(function(client){
            var db=client.db(dbName);
            db.collection(collectionName).updateOne(json1,{
                $set:json2
            },function(err,result){
                client.close();
                if(err){
                    reject(err);

                }else{
                    resolve(result);
                }
            })

        })
    })



}



//封装删除的方法

exports.remove=function(collectionName,json,callback){


    return new Promise(function(resolve,reject){

        _connect(function(client){
            var db=client.db(dbName);
            db.collection(collectionName).removeOne(json,function(err,result){
                client.close();
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })

        })
    })


}
