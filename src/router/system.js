const Router = require('koa-router')


const systemRouter = new Router()


const {
  roleList,
  addRole,
  editRole,
  deleteRole,
  userList,
  userRole,
  deleteUser
} =require('../controller/system') 

//角色列表
systemRouter.post("/admin/sys/role/list",roleList)

//添加角色
systemRouter.post("/admin/sys/role/addRole", addRole)

//编辑角色
systemRouter.post("/admin/sys/role/editRole", editRole)

//删除角色
systemRouter.post("/admin/sys/role/deleteRole", deleteRole)

//修改权限
systemRouter.post("/admin/sys/role/editAuth", editAuth)

//用户列表
systemRouter.post("/admin/sys/user/list", userList)

//修改用户的角色
systemRouter.post("/admin/sys/user/userRole", userRole)

//删除一个用户
systemRouter.post("/admin/sys/user/deleteUser",deleteUser)




module.exports=systemRouter