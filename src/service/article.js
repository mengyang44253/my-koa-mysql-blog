const connection = require("../config/database");
const dayjs = require("dayjs");
class ArticleService {
  async addArticle(query, tags) {
    try {
      const { title, content, content_html, directory, status, author } = query;
      let time = dayjs().unix();
      const statement = `INSERT INTO article (title,content,status,create_time,update_time,author,content_html) VALUES (?,?,?,?,?,?,?)`;
      const labelStatement = `INSERT INTO article_label (article_id,label_id) values (?,?)`;
      const [res] = await connection.execute(statement, [
        title,
        content,
        status,
        time,
        time,
        author,
        content_html,
      ]);
      let article_id = res.insertId;
      let ids = tags.concat(directory.split(","));
      if (ids.length) {
        for (const item of ids) {
          let labelRes = await connection.execute(labelStatement, [
            article_id,
            item,
          ]);
        }
      }
      return res;
    } catch (error) {}
  }

  async getArticleList(query) {
    try {
      const { pagination, limit, start, name, status, start_time, end_time } =
        query;
      let statement = `
    SELECT SQL_CALC_FOUND_ROWS  a.id,a.title,a.content,a.status,a.create_time,a.update_time,a.praise,a.read,a.comment_status,
    JSON_ARRAYAGG(JSON_OBJECT('name',l.name,'group_count',l.group_count,'type',l.type,'create_time',l.create_time)) as label_data,
    JSON_OBJECT('user_name',u.name,'user_id',u.user_id) as author_data
    FROM article a
    LEFT JOIN article_label al ON a.id = al.article_id
    LEFT JOIN label l ON al.label_id =l.id
    LEFT JOIN user u ON a.author =u.user_id
    GROUP BY a.id HAVING a.create_time BETWEEN ${start_time || 0} AND ${
        end_time || dayjs().unix()
      }
    `;
      if (name) {
        statement += ` AND title LIKE '%${name}%'`;
      }
      if (status) {
        statement += ` AND status=${status}`;
      }
      statement += ` ORDER BY a.create_time DESC`;
      if (pagination === "1") {
        statement += ` LIMIT ${start * limit},${limit}`;
      }
      const [res] = await connection.execute(statement);
      let countSql = `SELECT FOUND_ROWS() count`;
      const [countRes] = await connection.execute(countSql);
      return {
        data: res,
        count: countRes[0].count,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deletedArticle(query) {
    try {
      const { id } = query;
      const statement = `DELETE FROM article WHERE id=${id}`;
      const [res] = await connection.execute(statement);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async changeArticleStatus(query) {
    const { id, status } = query;
    const statement = `UPDATE article SET status=${status} WHERE id=${id}`;
    const [res] = await connection.execute(statement);
    return res;
  }

  async changeCommentStatus(query) {
    const { id, status } = query;
    const statement = `UPDATE article SET comment_status=${status} WHERE id=${id}`;
    const [res] = await connection.execute(statement);
    return res;
  }

  async getArticleDetail(query) {
    const { id } = query;
    console.log(id)
    const statement = `
    SELECT article.id,
      article.title,
      article.content,
      article.content_html,
      JSON_ARRAYAGG(JSON_OBJECT('name', label.name, 'group_count', label.group_count, 'create_time',
                                label.create_time,'type',label.type,'id',label.id)) as label_data
FROM article
        LEFT JOIN article_label ON (article.id = article_label.article_id)
        LEFT JOIN label ON article_label.label_id = label.id
GROUP BY article.id HAVING article.id=${id};
    `;
    const [res] = await connection.execute(statement);
    console.log(111111111111)
    console.log(res);
    return res[0];
  }
  async editArticle(query, tags) {
    try {
      const { id, title, content, content_html, directory, status } = query;
      let time = dayjs().unix();
      const statement = `UPDATE article SET title='${title}',content='${content}',content_html='${content_html}',status=${status} WHERE id=${id}`;
      const labelStatement = `INSERT INTO article_label (article_id,label_id) values (?,?)`;
      const [res] = await connection.execute(statement);
      let ids = tags.concat(directory.split(","));
      if (ids.length) {
        for (const item of ids) {
          let labelRes = await connection.execute(labelStatement, [id, item]);
        }
      }
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteArticleLabel(id) {
    const statement = `DELETE FROM article_label WHERE article_id=${id}`;
    const [res] = await connection.execute(statement);
    return res;
  }
}

module.exports = new ArticleService();
