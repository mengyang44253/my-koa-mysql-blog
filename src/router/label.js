const Router=require('koa-router')

const labelRouter=new Router()

const {
  addTag,
  checkTag,
  tagList,
  deleteTag,
  addDirectory,
  checkDirectory,
  directoryList,
  hotTag
}=require("../controller/label")

//后台添加tag
labelRouter.post("/admin/label/addTag",addTag)

//后台检查tag名字是否重复
labelRouter.post("/admin/label/checkTag",checkTag)

//后台tag列表
labelRouter.post("/admin/label/tagList", tagList)

//删除某一个标签
labelRouter.post("/admin/label/deleteTag", deleteTag)

//后台目录添加
labelRouter.post("/admin/label/addDirectory", addDirectory)

//后台目录名校验
labelRouter.post("/admin/label/checkDirectory", checkDirectory)

//后台目录列表
labelRouter.post("/admin/label/directoryList", directoryList)

//前台热门标签
labelRouter.post("/blog/label/hotTag",hotTag)

module.exports = labelRouter
