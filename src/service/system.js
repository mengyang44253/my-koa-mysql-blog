const connection = require("../config/database");
const dayjs = require("dayjs");

class SystemService {
  async addRole(query) {
    try {
      const { name, desc } = query;
    const time = dayjs().unix();
    const statement =
      "INSERT INTO role (name,create_time,update_time,`desc`) VALUES(?,?,?,?)";
    const [res] = await connection.execute(statement, [name, time, time, desc]);
    return res;
    } catch (error) {
      return error.errno
    }
    
  }
  async roleList(query) {
    console.log(query)
    const { pagination,start,limit,name}=query
    let statement=`SELECT`
  }

  async editRole() {
    
  }

  async editAuth() {
    
  }
}

module.exports = new SystemService();
