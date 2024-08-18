import ProductModel from "../models/ProductModel.js"
import ProductCategoryModel from '../models/ProductCategoryModel.js';
import CategoryModel from '../models/CategoryModel.js'
import ImageProductModel from '../models/ImageProductModel.js'
import OptionProductModel from './../models/OptionProductModel.js';

import { Op, Sequelize } from "sequelize";

class ProductController {

    constructor () {
        ProductModel.associate({
            CategoryModel,
            ProductCategoryModel,
            ImageProductModel,
            OptionProductModel
        })
    }



    async findAll(request, response){
        const {limit,page,fields,match,category_ids,price_range,option} = request.query

        const fieldsTratado = fields.split(',')

        const category_idsTratado = category_ids.split(',')

        const price_rangeTratado = price_range.split('-')

        const products = await ProductModel.findAll({
            attributes: fieldsTratado,
            include: [
                {
                    model: CategoryModel,
                    attributes: ["id"],
                    where: {
                        id: {
                            [Op.or]: category_idsTratado
                        }
                    }
                },
                {
                    model: ImageProductModel,
                    attributes: ["id", "enable", "path"]
                },
                {
                    model: OptionProductModel,
                    attributes: ["id","title","shape","radius","type","values"]
                }
            ],

            where: {
                price: {
                    [Op.between]: price_rangeTratado
                },

                name: {
                    [Op.substring]: match
                }
            }
        })

        let contadorLimit = 0
        const categoriaLimitada = []

        products.map((item)=>{
            if(limit < 0){
                categoriaLimitada.push(item)
                contadorLimit ++
            }else if(contadorLimit < limit){
                categoriaLimitada.push(item)
                contadorLimit ++
            }
        })

        if(products){
            return response.status(200).send({
                data: categoriaLimitada,
                total: contadorLimit,
                limit: limit,
                page: (limit == "-1"? "" : page)
            })
        }else{
            return response.status(404).send({
                message: "Produtos não encontrado."
            })
        }
    }



    async findById(request, response){
        const id = request.params.id

        const produto = await ProductModel.findByPk(id, {
            attributes:["id","enable","name","slug","stock","description","price","price_with_discount"],
            include: [
                {
                    model: CategoryModel,
                    attributes: ["id"]
                },
                {
                    model: ImageProductModel,
                    attributes: ["id", "enable", "path"]
                },
                {
                    model: OptionProductModel,
                    attributes: ["id","title","shape","radius","type","values"]
                }
            ]
        })

        if(produto){
            return response.status(200).send(produto)
        }else{
            return response.status(404).send({
                message: "Produto não encontrado."
            })
        }
    }



    async create(request, response){

        const {Categoria, Imagens, Opicoes, ...body} = request.body

        let product = await ProductModel.create(body, {
            include: {
                through: ProductCategoryModel,
                model: CategoryModel
            }
        })

        product.setCategoria(Categoria)

        Imagens.map(async(item)=>{
            await ImageProductModel.create({
                product_id: product.id,
                enable: item.enable,
                path: item.path
            })
        })
        
        Opicoes.map(async(item)=>{
            await OptionProductModel.create({
                product_id: product.id,
                title: item.title,
                shape: item.shape,
                radius: item.radius,
                type: item.type,
                values: item.values
            })
        })

        response.status(201).send({
            message: "Produto cadastrado com sucesso."
        })
    }



    async update(request, response){
        const id = request.params.id
        const body = request.body

        await ProductModel.update(body, {
            where: {id}
        })

        body.Imagens.map(async(item)=>{
            await ImageProductModel.update(item, {
                where: {id: item.id}
            })
        })
        
        body.Opicoes.map(async(item)=>{
            await OptionProductModel.update(item, {
                where: {id: item.id}
            })
        })
        
        return response.status(204).send()
    }



    async delete(request, response){
        const id = request.params.id

        await ProductCategoryModel.destroy({
            where: {
               product_id: id
            }
        })

        await ImageProductModel.destroy({
            where: {
               product_id: id
            }
        })

        await OptionProductModel.destroy({
            where: {
               product_id: id
            }
        })

        await ProductModel.destroy({
            where: {id}
        })

        return response.status(204).send()
    }
}

export default new ProductController