'use strict';

const Subject = use('App/Models/Subject');
const Logger = use('Logger');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with subjects
 */
class SubjectController {
	/**
   * Show a list of all subjects.
   * GET subjects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async index({ request }) {
		Logger.info(`Requisição feita em ${request.url()}`);
		const subjects = await Subject.query().with('monitor').fetch();

		return subjects;
	}

	/**
   * Create/save a new subject.
   * POST subjects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async store({ request, auth }) {
		const data = request.only([ 'field', 'specify', 'title', 'place', 'date', 'hours' ]);

		const subject = await Subject.create({ user_id: auth.user.id, ...data });

		return subject;
	}

	/**
   * Display a single subject.
   * GET subjects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
	async show({ params }) {
		const subject = await Subject.findOrFail(params.id);

		return subject;
	}

	/**
   * Update subject details.
   * PUT or PATCH subjects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async update({ params, auth, response, request }) {
		const data = request.only([ 'field', 'specify', 'title', 'place', 'date', 'hours' ]);
		const subject = await Subject.findOrFail(params.id);

		if (subject.user_id != auth.user.id) {
			return response.status(401).send('Você não tem permissão para fazer isso!');
		}
		subject.merge(data);

		await subject.save();

		return subject;
	}

	/**
   * Delete a subject with id.
   * DELETE subjects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
	async destroy({ params, auth, response }) {
		const subject = await Subject.findOrFail(params.id);

		if (subject.user_id != auth.user.id) {
			return response.status(401).send('Você não tem permissão para fazer isso!');
		}
		await subject.delete();

		return 'Matéria deletada com sucesso!';
	}
}

module.exports = SubjectController;
