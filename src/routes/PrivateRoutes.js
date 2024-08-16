import express from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

import UserRoutes from './UserRoutes.js';



const PrivateRoutes = express.Router()

PrivateRoutes.use((request, respnse, next)=>{
    const token = request.headers.token
    try{
        jwt.verify(token, process.env.KEY)
    }catch(erro){
        return respnse.status(401).send({message:"Acesso não autorizado.", erro})
    }
    next()
})


PrivateRoutes.use(UserRoutes)



export default PrivateRoutes
