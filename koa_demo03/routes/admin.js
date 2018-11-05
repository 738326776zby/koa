/**
 * Created by Administrator on 2018/3/20 0020.
 */
var router=require('koa-router')();

var user=require('./admin/user.js');

var focus=require('./admin/focus.js');

var newscate=require('./admin/newscate.js');

var login=require('./admin/login.js');


router.use(async (ctx,next)=>{

    ctx.state.__ROOT__='http://'+ctx.header.host;
    await next();
})

//配置admin的子路由  层级路由
router.get('/',(ctx)=>{
    ctx.render('admin/index');
})

router.use('/user',user);
router.use('/focus',focus);

router.use('/login',login);

router.use('/newscate',newscate);


module.exports=router.routes();