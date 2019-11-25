'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Comment = use('App/Models/Comment')
/**
 * Resourceful controller for interacting with comments
 */
class CommentController {
  /**
   * Show a list of all comments.
   * GET comments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const comments = await Comment
      .query()
      .with('owner')
      .fetch()

    return comments
  }

  /**
   * Create/save a new comment.
   * POST comments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(['comment'])

    const comment = await Comment.create({ user_id: auth.user.id, ...data })

    return comment
  }

  /**
   * Display a single comment.
   * GET comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const comment = await Comment.findOrFail(params.id)

    return comment
  }

  /**
   * Update comment details.
   * PUT or PATCH comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const data = request.only(['comment'])
    const comment = await Comment.findOrFail(params.id)

    if (comment.user_id != auth.user.id) {
      return response
        .status(401)
        .send('Você não tem permissão para isso!')
    }

    comment.merge(data)
    await comment.save()

    return comment
  }

  /**
   * Delete a comment with id.
   * DELETE comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const comment = await Comment.findOrFail(params.id)

    if (comment.user_id != auth.user.id) {
      return response
        .status(401)
        .send('Você não tem permissão para isso!')
    }

    await comment.delete()

    return 'Comentário deletado com sucesso!'
  }
}

module.exports = CommentController
