const connection=require('../config/database')

const dayjs=require('dayjs')

class UserService {
  //注册
  async register(name, password, address) {
    let time = dayjs().unix();
    const loginStatement = `INSERT INTO login (account,password) VALUES(?,?)`;
    const userStatement = `INSERT INTO user (name,register_time,update_time,register_address,last_login_time,last_login_address,user_id) VALUES(?,?,?,?,?,?,?)`;
    const result = await connection.execute(loginStatement, [name, password]);
    let user_id = result[0].insertId;
    const [res] = await connection.execute(userStatement, [
      name,
      time,
      time,
      address,
      time,
      address,
      user_id,
    ]);
    console.log(111111);
    console.log(res);
    return res;
  }

  //用户名是否重复
  async getUserByName(name) {
    const statement = `SELECT * from login WHERE account =?`;
    const [res] = await connection.execute(statement, [name]);
    return res;
  }

  //更新用户登陆地
  async updateUserInfo(user_id,time,address) {
    const statement = `UPDATE user SET last_login_address=?,last_login_time=? WHERE user_id=?`;
    console.log(statement);
    const [res] = await connection.execute(statement, [address,time,user_id]);
    return res
  }

  //获取用户信息
  async getUserInfoById(id){
    console.log(id)
    const statement=`SELECT * FROM user WHERE user_id=?`
    const [res]=await connection.execute(statement,[id])
    return res[0]
  }
}

module.exports=new UserService()
