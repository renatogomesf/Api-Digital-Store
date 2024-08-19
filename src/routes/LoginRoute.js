import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import AuthenticateController from "../controllers/AuthenticateController.js";


const LoginRoute = express.Router()

LoginRoute.post('/login', async (request, response)=>{
    const {email, password} = request.body

    if(email && password){
        const dados = await AuthenticateController.login(email, password)

        if(dados){
    
            const user = dados[0].dataValues
    
            const dataToken = {
                id: user.id,
                firstname: user.firstname,
                surname: user.surname,
                email: user.email,
    
                // expira em 1 hora
                exp: Math.floor(Date.now()/1000) + (60*60)
            }
    
            const token = jwt.sign(dataToken, process.env.KEY)
    
            return response.status(200).send({
                token: token
            })
        }else{
            response.status(401).send({message:'Login ou Senha incorreto.'})
        }
    }else{
        response.status(400).send({message:'Preencha todos os campos para efetuar login.'})
    }
})


export default LoginRoute
