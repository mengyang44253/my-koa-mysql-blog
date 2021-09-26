const connection = require('../config/database')



class FriendService{
  async createFriend(query) {
    const { name,img,website,status } =query
    const statement = ``
    
    const [res]=await connection.execute(statement)

    return res
  }

  async friendList(query) {
    const { start_time,end_time,start,limit,pagination,name }=query
    let statement = ``
    

    const [res]=await connection.execute(statement)


    return {

    }
  }

  async editFriend(query) {
    const { id, name, img, website, status } = query
    
    const statement = ``
    
    const [res] = await connection.execute(statement)
    
    return res
  }

  async deletedFriend(query) {
    const { id } = query
    const statement = ``
    const [res] = await connection.execute(statement)
    
    return res
  }


}


module.exports = new FriendService()