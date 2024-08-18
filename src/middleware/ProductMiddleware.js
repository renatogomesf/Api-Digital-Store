import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

class ProductMiddleware {

    verifyFindAll(request, response, next){
        const {limit,page,fields,match,category_ids,price_range,option} = request.query

        if(limit && page && fields && match && category_ids && price_range && option){
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
            const {name,slug,price,price_with_discount,category_ids,images,options} = request.body
    
            if(name && slug && price && price_with_discount && category_ids.length > 0 && images.length > 0 && options.length > 0){
                next()
            }else{
                return response.status(400).send({
                    message: "Preencha todos os campos para realizar o cadastro."
                })
            }
        }
    }



}

export default new ProductMiddleware