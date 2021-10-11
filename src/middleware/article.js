

//tag是否是新增的
const verifyLabelExists = async (ctx,next) => {
  const { tag } = ctx.request.body
  let arrTag=tag.split(",")
  console.log(tag)
  ctx.tags=[...arrTag]
  next()
}

module.exports = {
  verifyLabelExists
}