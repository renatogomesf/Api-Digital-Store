import UserModel from "../models/UserModel.js"

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

class UserMiddleware {
    verifyCreate(request, response, next){

        // NÃO COLOQUEI AUTORIZAÇÃO JWT NESTA ROTA POIS UM USUÁRIO QUE DESEJA CRIAR UMA CONTA NÃO POSSUI UM TOKEN AINDA.

        const {firstname,surname,email,password,confirmPassword} = request.body

        if(firstname && surname && email && password && confirmPassword){
            if(password === confirmPassword){
                next()
            }else{
                return response.status(400).send({
                    message: "Senhas não correspondem."
                })
            }
        }else{
            return response.status(400).send({
                message: "Preencha todos os campos para realizar o cadastro."
            })
        }
    }


    async verifyUpdate(request, response, next){

        const authorization = request.headers.authorization

        let autorizado = false

        try{
            jwt.verify(authorization, process.env.KEY)
            autorizado = true
        }catch(erro){
            return response.status(401).send({message:"Acesso não autorizado. Faça login para realizar a ação", erro})
        }


        if(autorizado){
            const id = request.params.id
            const {firstname,surname,email} = request.body
    
            const user = await UserModel.findByPk(id)
    
            if(user){
                if(firstname && surname && email){
                    next()
                }else{
                    return response.status(400).send({
                        message: "Preencha todos os campos para atualizar."
                    })
                }
            }else{
                return response.status(404).send({
                    message: `Usuário com id ${id} não encontrado.`
                })
            }
        }
    }


    async verifyDelete(request, response, next){

        const authorization = request.headers.authorization

        let autorizado = false

        try{
            jwt.verify(authorization, process.env.KEY)
            autorizado = true
        }catch(erro){
            return response.status(401).send({message:"Acesso não autorizado. Faça login para realizar a ação", erro})
        }


        if(autorizado){
            const id = request.params.id
    
            const user = await UserModel.findByPk(id)
    
            if(user){
                next()
            }else{
                return response.status(404).send({
                    message: `Usuário com id ${id} não encontrado.`
                })
            }
        }
    }
}

export default new UserMiddleware
