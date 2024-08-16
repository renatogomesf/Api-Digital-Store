import UserModel from '../models/UserModel.js';
import MD5 from 'crypto-js/md5.js';

class AuthenticateController {
    async login(email, password){
        const dados =  await UserModel.findAll({
            where: {
                email: email,
                password: MD5(password).toString()
            }
        })

        console.log(dados)

        if(dados.length){
            return dados
        }else{
            return null
        }
    }
}

export default new AuthenticateController
