const SystemService=require('../service/system')


class SystemController{
  async roleList(ctx, next) {
    const query = ctx.request.body
    console.log(query)
    const res = await SystemService.roleList(query)
    console.log(res)
    ctx.body = {
      success:true
    }
  }
  async addRole(ctx, next) {
    const query = ctx.request.body
    console.log(query)
    const res = await SystemService.addRole(query)
    console.log(res)
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
    


    ctx.body = {
      
    }
  }

  async deleteRole(ctx,next) {
    


    ctx.body = {
      
    }
  }

  async editAuth(ctx, next) {
    

    ctx.body = {
      
    }
  }

  async userList(ctx, next) {
    


    ctx.body = {
      
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