import CategoryModel from './../models/CategoryModel.js';


class CategoryController {
    async findAll(request, response){

        const {limit,page,fields,use_in_menu} = request.query

        const fieldsTratado = fields.split(',')

        const useInMenu = (use_in_menu == "true"? 1 : 0)


        const categorys = await CategoryModel.findAll({
            attributes: fieldsTratado,
            where: {
                use_in_menu: useInMenu
            }
        })


        let contadorLimit = 0
        const categoriaLimitada = []

        categorys.map((item)=>{
            if(limit < 0){
                categoriaLimitada.push(item)
                contadorLimit ++
            }else if(contadorLimit < limit){
                categoriaLimitada.push(item)
                contadorLimit ++
            }
        })


        return response.status(200).send({
            data: categoriaLimitada,
            total: contadorLimit,
            limit: limit,
            page: (limit == "-1"? "" : page)
        })
    }


    async findById(request, response){
        const id = request.params.id

        const user = await CategoryModel.findByPk(id, {
            attributes: ["id", "firstname", "surname", "email"]
        })

        if(user){
            return response.status(200).send(user)
        }else{
            return response.status(404).send({
                message: "Usuário não encontrado."
            })
        }
    }


    async create(request, response){
        const {name,slug,use_in_menu} = request.body

        const body = {
            name,
            slug,
            use_in_menu
        }

        await CategoryModel.create(body)

        return response.status(201).send({
            message: "Categoria cadastrada com sucesso"
        })
    }


    async update(request, response){
        const id = request.params.id
        const body = request.body

        await CategoryModel.update(body, {
            where: {id}
        })

        return response.status(204).send()
    }


    async delete(request, response){
        const id = request.params.id

        await CategoryModel.destroy({
            where: {id}
        })

        return response.status(204).send()
    }
}

export default new CategoryController
