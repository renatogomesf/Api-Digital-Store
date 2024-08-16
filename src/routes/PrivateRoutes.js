import express from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

import UserRoutes from './UserRoutes.js';
import CategoryRoutes from "./CategoryRoutes.js";



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
PrivateRoutes.use(CategoryRoutes)



export default PrivateRoutes
