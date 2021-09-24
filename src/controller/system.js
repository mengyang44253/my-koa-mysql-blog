const SystemService=require('../service/system')


class SystemController{
  async roleList(ctx, next) {
    const query = ctx.request.body
    const res = await SystemService.roleList(query)
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    }
  }
  async addRole(ctx, next) {
    const query = ctx.request.body
    const res = await SystemService.addRole(query)
    if (res === 1062) {
      ctx.body = {
        success: false,
        data:'角色名重复'
      }
    } else {
      ctx.body = {
        success:true,
        data:res
      }
    }
    
  }

  async editRole(ctx, next) {
    const query = ctx.request.body
    console.log(query)
    const res=await SystemService.editRole(query)
    ctx.body = {
      success: true,
      data:res
    }
  }
  async getAuth(ctx, next) {
    const query = ctx.request.query
    console.log(SystemService)
    const res = await SystemService.getAuth(query)
    
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    }
  }

  async deleteRole(ctx,next) {
    const query = ctx.request.query
    const res=await SystemService.deletedRole(query.id)
    ctx.body = {
      success: true,
      data:res
    }
  }

  async editAuth(ctx, next) {
    const query = ctx.request.body
    console.log(query)
    const res=await SystemService.editAuth(query)

    ctx.body = {
      success: true,
      data:res
    }
  }

  async userList(ctx, next) {
    const query = ctx.request.body
    const res=await SystemService.userList(query)


    ctx.body = {
      success: true,
      // data:,
      // count:
    }
  }

  async userRole(ctx, next) {
    


    ctx.body = {
      
    }
  }

  async deleteUser(ctx, next) {
    

    ctx.body = {
      
    }
  }
}

module.exports=new SystemController