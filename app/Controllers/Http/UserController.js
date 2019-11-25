'use strict'

const User = use('App/Models/User')

class UserController {
    async store({ request }) {
        const data = await request.only([
            'name',
            'email',
            'registry',
            'password'
        ])

        const user = await User.create(data)

        return user
    }

    async authenticate({ request, auth }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)

        return token
    }

    async index() {
        const users = await User.all()

        return users
    }

    async show({ params }) {
        const user = await User.find(params.id)

        return user
    }

    async destroy({ params, response, auth }) {
        const user = await User.findOrFail(params.id)

        if (params.id != auth.user.id) {
            return response
                .status(401)
                .send('Você não tem permissão para isso')
        }
        await user.delete()

        return 'Usuário deletado com sucesso!'
    }
}

module.exports = UserController
