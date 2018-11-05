
var router = require('koa-router')();


var DB=require('../model/db.js');

var url=require('url');


//配置中间件 获取url的地址
router.use(async (ctx,next)=>{
    //console.log(ctx.request.header.host);
    var pathname=url.parse(ctx.request.url).pathname;

    //导航条的数据
    var navResult=await DB.find('nav',{$or:[{'status':1},{'status':'1'}]},{},{

        sortJson:{'sort':1}
    })
    //模板引擎配置全局的变量
    ctx.state.nav=navResult;
    ctx.state.pathname=pathname;

    await  next()
})


router.get('/',async (ctx)=>{

    //ctx.body="前台首页";
    console.time('start');

    //轮播图  注意状态数据不一致问题  建议在后台增加数据的时候状态 转化成number类型
    var focusResult=await DB.find('focus',{$or:[{'status':1},{'status':'1'}]},{},{

        sortJson:{'sort':1}
    })

    console.timeEnd('start');

    ctx.render('default/index',{

        focus:focusResult
    });

})
router.get('/news',async (ctx)=>{

    ctx.render('default/news');

})

router.get('/service',async (ctx)=>{


    //查询

    var serviceList=await DB.find('article',{'pid':'5ab34b61c1348e1148e9b8c2'});
    console.log(serviceList);
    ctx.render('default/service',{
        serviceList:serviceList
    });



})

router.get('/content/:id',async (ctx)=>{

    console.log(ctx.params);

    var id=ctx.params.id;

    var content=await  DB.find('article',{'_id':DB.getObjectId(id)});

    console.log(content);

    ctx.render('default/content',{
        list:content[0]

    });
})

router.get('/about',async (ctx)=>{

    ctx.render('default/about');

})

router.get('/case',async (ctx)=>{

    //获取成功案例下面的分类
    var cateResult=await  DB.find('articlecate',{'pid':'5ab3209bdf373acae5da097e'});
    //循环子分类获取子分类下面的所有的内容
    var subCateArr=[];
    for(var i=0;i<cateResult.length;i++){

        subCateArr.push(cateResult[i]._id.toString());
    }
    //console.log(subCateArr)

    //获取所有子分类下面的数据

    //SQL:
    //
    // db.article.find({"pid":{$in:['5ab32da7b0c895428c85f78d','5afa568d416f21368039b05b']}},{"title":1,'pid':1})

    var  articleResult=await DB.find('article',{"pid":{$in:subCateArr}});

    console.log(cateResult);
    console.log(articleResult);
    ctx.render('default/case',{

        catelist:cateResult,
        articlelist:articleResult
    });

})

router.get('/connect',async (ctx)=>{

    ctx.render('default/connect');
})




module.exports=router.routes();