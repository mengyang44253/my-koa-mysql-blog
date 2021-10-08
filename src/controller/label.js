const LabelService=require("../service/label")


class LabelController {
  async addTag(ctx, next) {
    const query = ctx.request.body;
    const res = await LabelService.addTag(query);

    ctx.body = {
      success: true,
      data: res,
    };
  }

  async checkTag(ctx, next) {
    const query = ctx.request.query
    console.log(query)
    const res = await LabelService.checkTagNameIsExist(query)
    console.log(res)
    ctx.body = {
      success: true,
      data:res
    };
  }

  async tagList(ctx, next) {
    const query = ctx.request.body
    const res = await LabelService.getTagList(query)
    
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    };
  }

  async deleteTag(ctx, next) {
    const query = ctx.request.query
    console.log(query)
    const res=await LabelService.deletedSomeTag(query)
    ctx.body = {
      success: true,
      data:res
    };
  }

  async addDirectory(ctx, next) {
    const query = ctx.request.body
    console.log(query)
    const res=await LabelService.addDirectory(query)
    ctx.body = {
      success: true,
      data:res
    };
  }

  async checkDirectory(ctx, next) {
    const query = ctx.request.query
    const res=await LabelService.checkDirectoryName(query)
    ctx.body = {
      success: true,
      data:res
    };
  }

  async directoryList(ctx, next) {
    const query = ctx.request.body
    const res = await LabelService.getDirectoryList(query)
    
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    };
  }
  async deletedDirectory(ctx, next) {
    ctx.body = {};
  }

  async hotTag(ctx, next) {
    ctx.body = {};
  }
}

module.exports = new LabelController();
