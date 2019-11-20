'use strict'

const User = use('App/Models/User')

class UserController {
    async store({ request, params }) {
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
        const user = await User.all()

        return user
    }

    async show({ params }) {
        const user = await User.find(params.user_id)

        return user
    }
}

module.exports = UserController
