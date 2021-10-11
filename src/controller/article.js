const ArticleService=require("../service/article")

class ArticleController{
  async addArticle(ctx, next) {
    const query = ctx.request.body
    console.log(ctx.tags)
    const res = await ArticleService.addArticle(query,tags)
    

    ctx.body = {
      success: true,
      data:res
    }
  }


  async editArticle(ctx, next) {
    


    ctx.body = {
      
    }
  }

  async articleList(ctx, next) {
    

    ctx.body = {
      
    }
  }

  async articleStatus(ctx, next) {
    
    ctx.body = {
      
    }
  }

  async getDetailById(ctx, next) {
    


    ctx.body = {
      
    }
  }

  async deleteArticle(ctx, next) {
    


    ctx.body = {
      
    }
  }

  async likeSomeArticle(ctx,next) {
    

    ctx.body = {
      
    }
  }

  async updateArticleRead(ctx, next) {
    
    ctx.body = {
      
    }
  }

  async hotArticle(ctx,next) {
    
  }
}


module.exports=new ArticleController()