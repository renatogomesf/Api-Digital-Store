import CategoryModel from "../models/CategoryModel.js"

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()


class CategoryMiddleware {

    verifyFindAll(request, response, next){
        const {limit,page,fields,use_in_menu} = request.query

        if(limit && page && fields && use_in_menu){
            next()
        }else{
            return response.status(400).send({
                message: "Envie todos os campos para realizar busca."
            })
        }
    }



    verifyCreate(request, response, next){

        const authorization = request.headers.authorization

        let autorizado = false

        try{
            jwt.verify(authorization, process.env.KEY)
            autorizado = true
        }catch(erro){
            return response.status(401).send({message:"Acesso não autorizado. Faça login para realizar a ação", erro})
        }



        if(autorizado){
            const {name,slug} = request.body
    
            if(name && slug){
                next()
            }else{
                return response.status(400).send({
                    message: "Preencha todos os campos para realizar o cadastro."
                })
            }
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
            const {name,slug,use_in_menu} = request.body
    
            const category = await CategoryModel.findByPk(id)
    
            if(category){
                if(name && slug && use_in_menu){
                    next()
                }else{
                    return response.status(400).send({
                        message: "Preencha todos os campos para atualizar."
                    })
                }
            }else{
                return response.status(404).send({
                    message: `Categoria com id ${id} não encontrada.`
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
    
            const category = await CategoryModel.findByPk(id)
    
            if(category){
                next()
            }else{
                return response.status(404).send({
                    message: `Categoria com id ${id} não encontrada.`
                })
            }
        }
    }
}

export default new CategoryMiddleware
