const Router = require('koa-router')


const systemRouter = new Router()


const {
  roleList,
  addRole
} =require('../controller/system') 

//角色列表
systemRouter.post("/admin/sys/role/list",roleList)

//添加角色
systemRouter.post("/admin/sys/role/addRole",addRole)




module.exports=systemRouter