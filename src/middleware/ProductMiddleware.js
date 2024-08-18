import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

import ProductModel from '../models/ProductModel.js';

class ProductMiddleware {

    verifyFindAll(request, response, next){
        const {limit,page,fields,category_ids,price_range,option} = request.query

        if(limit && page && fields && category_ids && price_range && option){
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
            const {name,slug,price,price_with_discount,Categoria,Imagens,Opicoes} = request.body
    
            if(name && slug && price && price_with_discount && Categoria.length > 0 && Imagens.length > 0 && Opicoes.length > 0){
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

            const {name,slug,description,price,price_with_discount} = request.body
    
            const category = await ProductModel.findByPk(id)
    
            if(category){
                if(name && slug && description && price && price_with_discount){
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
    
            const user = await ProductModel.findByPk(id)
    
            if(user){
                next()
            }else{
                return response.status(404).send({
                    message: `Produto com id ${id} não encontrado.`
                })
            }
        }
    }
}

export default new ProductMiddleware