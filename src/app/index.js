const Koa=require('koa')
const myRoutes=require('../router')

const errorHandle=require('../global/error')

const app=new Koa()
myRoutes(app)

app.on('error',errorHandle)

module.exports = app