import UserModel from "../models/UserModel.js"

class UserController {
    async findAll(request, response){
        const users = await UserModel.findAll()

        return response.status(200).send(users)
    }


    async findById(request, response){
        const id = request.params.id

        const user = await UserModel.findByPk(id)

        return response.status(200).send(user)
    }


    async create(request, response){
        const body = request.body

        await UserModel.create(body)

        return response.status(201).send({
            message: "Usuário criado com sucesso",
            user: body
        })
    }


    async update(request, response){
        const id = request.params.id
        const body = request.body

        await UserModel.update(body, {
            where: {id}
        })

        return response.status(200).send({
            message: "Usuário atualizado com sucesso",
            user: body
        })
    }


    async delete(request, response){
        const id = request.params.id

        await UserModel.destroy({
            where: {id}
        })

        return response.status(200).send({
            message: "Usuário deletado com sucesso"
        })
    }
}

export default new UserController
