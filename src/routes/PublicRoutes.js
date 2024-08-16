import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import UserMiddleware from "../middleware/UserMiddleware.js";
import UserController from "../controllers/UserController.js";
import AuthenticateController from "../controllers/AuthenticateController.js";



const PublicRoutes = express.Router()

PublicRoutes.post('/v1/user', UserMiddleware.verifyCreate, UserController.create)

PublicRoutes.post('/login', async (request, response)=>{
    const body = request.body

    const dados = await AuthenticateController.login(body.email, body.password)

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
            data: dataToken,
            token: token
        })
    }else{
        response.send({message:'login ou senha incorreto'})
    }

})


export default PublicRoutes
