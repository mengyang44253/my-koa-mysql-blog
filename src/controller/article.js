const ArticleService=require("../service/article")

class ArticleController{
  async addArticle(ctx, next) {
    const query = ctx.request.body
    console.log(query)
    const tags=ctx.tags
    const res = await ArticleService.addArticle(query, tags)
    console.log(res)
    console.log(1111111)
    ctx.body = {
      success: true,
      data:res
    };
  }


  async editArticle(ctx, next) {
    const query = ctx.request.body
    const tags=ctx.tags
    const res=await ArticleService.editArticle(query,tags)
    ctx.body = {
      success:true
    }
  }

  async articleList(ctx, next) {
    const query=ctx.request.body
    const res=await ArticleService.getArticleList(query)
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    }
  }

  async articleStatus(ctx, next) {
    const query = ctx.request.body
    const res=await ArticleService.changeArticleStatus(query)
    ctx.body = {
      success:true
    }
  }

  async commentStatus(ctx,next) {
    const query = ctx.request.body
    const res=await ArticleService.changeCommentStatus(query)
    ctx.body = {
      success:true
    }
  }

  async getDetailById(ctx, next) {
    const query = ctx.request.query
    const res =await ArticleService.getArticleDetail(query)
    console.log(res)
    ctx.body = {
      success: true,
      data:res
    }
  }

  async deleteArticle(ctx, next) {
    console.log(11111111)
    const query =ctx.request.query
    console.log(query)
    const res=await ArticleService.deletedArticle(query)
    ctx.body = {
      success:true
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