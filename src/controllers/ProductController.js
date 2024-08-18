import ProductModel from "../models/ProductModel.js"
import ProductCategoryModel from '../models/ProductCategoryModel.js';
import CategoryModel from '../models/CategoryModel.js'
import ImageProductModel from '../models/ImageProductModel.js'
import OptionProductModel from './../models/OptionProductModel.js';

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

        const optionTratado = option.split(',')

        const products = await ProductModel.findAll({
            attributes: fieldsTratado,
            include: [
                {
                    model: CategoryModel,
                    attributes: ["id"]
                },
                {
                    model: ImageProductModel,
                    attributes: ["id", "path"]
                },
                {
                    model: OptionProductModel
                }
            ]
        })



        const produtoFiltrado = products.map(async(produto)=>{
            let infoProduto = {
                name: produto.name,
                description: produto.description,
                price: produto.price,
                categoria: '',
                opicao: ''
            }

            // let categoriaProduto = ''

            // let opicaoProduto = ''


            produto.Categoria.map((categoria)=>{
                infoProduto.categoria += `${categoria.id},`
            })

            produto.Opicoes.map((opicoes)=>{
                infoProduto.opicao += `${opicoes.values}-`
            })

            return infoProduto
        })

        console.log(produtoFiltrado)

        

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


    findById(request, response){}


    async create(request, response){

        const {category_ids, images, options, ...body} = request.body

        let product = await ProductModel.create(body, {
            include: {
                through: ProductCategoryModel,
                model: CategoryModel
            }
        })

        product.setCategoria(category_ids)


        images.map(async(item)=>{
            await ImageProductModel.create({
                product_id: product.id,
                enable: item.enable,
                path: item.path
            })
        })
        

        options.map(async(item)=>{
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


    update(request, response){}


    delete(request, response){}
}

export default new ProductController