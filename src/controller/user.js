const UserService=require('../service/user')
const axios=require('axios')
const dayjs=require('dayjs')
const jwt=require('jsonwebtoken')

const {
	decrypt
} =require('../utils')

const { PRIVATE_KEY } = require("../config/envConstant");

class UserController {
	async register(ctx,next){
			const { name, password } = ctx.request.body;
      const ip = await getIpInfo(ctx);
      const address = `${ip.result.ip} ${ip.result.ad_info.nation}${ip.result.ad_info.province}${ip.result.ad_info.city}${ip.result.ad_info.district}`;
      const res = await UserService.register(name, password, address);
			console.log('body',res);
		ctx.body={
			success:true,
			data:res
		}
	}

	async login(ctx,next){
		//1.获取用户名
		const {name,password} =ctx.request.body
		//判断用户是否存在
		const res=await UserService.getUserByName(name)
		console.log(res,'用户是否存在');
		if (!res.length) {
      ctx.body = {
        success: false,
        data: "账号不存在",
      };
			return
    }
		//判断密码和数据库中的是否一致
		console.log(decrypt(password));
		console.log(decrypt(res[0].password));
		console.log(decrypt(password) !== decrypt(res[0].password));
		if(decrypt(password)!==decrypt(res[0].password)){
			ctx.body = {
        success: false,
        data: "密码错误",
      };
			return 
		}
		//更新信息
		const id = res[0].id;
		let time = dayjs().unix();
		const ip = await getIpInfo(ctx);
    const address = `${ip.result.ip} ${ip.result.ad_info.nation}${ip.result.ad_info.province}${ip.result.ad_info.city}${ip.result.ad_info.district}`;
		const token = jwt.sign({ user_id: id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 30,
      algorithm: "RS256",
    });
		const result = await UserService.updateUserInfo(id, time,address);
		ctx.body={
			success:true,
			data:id,
			token
		}

	}

	async checkName(ctx,next){
		const {name}=ctx.request.body
		const res = await UserService.getUserByName(name)

		ctx.body={
			success:true,
			data:res
		}
	}

	async getUserInfoById(ctx,next){

	}

	async checkPassword(ctx,next){

	}

	async repeatPassword(ctx,next){

	}

	async updatePassword(ctx,next){

	}

	async updateUserInfo(ctx,next){

	}
}

//腾讯得位置服务api获取id地址
const getIpInfo = async function (ctx) {
  const ip = ctx.ip.split(":").pop()
  const res = await axios.get('https://apis.map.qq.com/ws/location/v1/ip', {
    params: {
      key: "QDWBZ-SH5KD-KA64W-POSPZ-RJLZ5-GEBCH",
      id: ip
    }
  })
  return res.data
}

module.exports = new UserController()