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


    findAll(request, response){}

    findById(request, response){}

    async create(request, response){

        const {category_ids, images, options, ...body} = request.body

        let product = await ProductModel.create(body, {
            include: [
                {
                    model: ImageProductModel
                },
                {
                    model: OptionProductModel
                },
                {
                    through: ProductCategoryModel,
                    model: CategoryModel,
                }
            ]
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


        response.send({message: "deu certo"})
    }

    update(request, response){}

    delete(request, response){}
}

export default new ProductController