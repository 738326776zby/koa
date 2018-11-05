
const Koa=require('koa'),
     router=require('koa-router')(),
    render = require('koa-art-template'),
    path=require('path'),
    static = require('koa-static'),
    koaBodyparser = require('koa-bodyparser'),
    session = require('koa-session');
    var app=new Koa();

//引入子模块

var admin=require('./routes/admin.js');
var api=require('./routes/api.js');
var index=require('./routes/index.js');

//配置静态web
app.use(static(__dirname +'/public'));
//配置post的中间件
app.use(koaBodyparser());

//配置koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//配置session

app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));






//配置路由
router.use(index);
/*
  /admin   配置子路由  层级路由
 /admin/user
 */
router.use('/admin',admin);
/*
 /api/newslist   新闻列表的api
 */
router.use('/api',api);   /*在模块里面暴露路由并且启动路由*/
//启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(8008);









