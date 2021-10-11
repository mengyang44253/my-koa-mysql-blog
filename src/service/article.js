const connection =require("../config/database")
const dayjs=require("dayjs")
class ArticleService{
  async addArticle(query,tags) {
    console.log(query)
    const { title, content, directory, tag, status, author } = query
    let time=dayjs().unix()
    const statement = `INSERT INTO article (title,content,status,create_time,update_time,author,)`
    const labelStatement = `INSERT INTO article_label (article_id,label_id) values (?,?)`
    const [res] = await connection.execute(statement, [title, content, status, time, time, author])
    
    
  }
}

module.exports = new ArticleService()
