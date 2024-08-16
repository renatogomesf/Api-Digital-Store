import CategoryModel from "../models/CategoryModel.js"

class CategoryMiddleware {
    verifyCreate(request, response, next){
        const {name,slug} = request.body

        if(name && slug){
            next()
        }else{
            return response.status(400).send({
                message: "Preencha todos os campos para realizar o cadastro."
            })
        }
    }


    // async verifyUpdate(request, response, next){
    //     const id = request.params.id
    //     const {firstname,surname,email} = request.body

    //     const user = await UserModel.findByPk(id)

    //     if(user){
    //         if(firstname && surname && email){
    //             next()
    //         }else{
    //             return response.status(400).send({
    //                 message: "Preencha todos os campos para atualizar."
    //             })
    //         }
    //     }else{
    //         return response.status(404).send({
    //             message: `Usuário com id ${id} não encontrado.`
    //         })
    //     }
    // }


    // async verifyDelete(request, response, next){
    //     const id = request.params.id

    //     const user = await UserModel.findByPk(id)

    //     if(user){
    //         next()
    //     }else{
    //         return response.status(404).send({
    //             message: `Usuário com id ${id} não encontrado.`
    //         })
    //     }
    // }
}

export default new CategoryMiddleware
