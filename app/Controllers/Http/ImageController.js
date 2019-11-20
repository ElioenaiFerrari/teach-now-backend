'use strict'

const multer = use('App/Middleware/multer')

class ImageController {
    async store({ request, response }) {
        if (request.file) {
            return response.send(request.file)
        }

        return response.send('Erro ao fazer upload')
    }
}

module.exports = ImageController
