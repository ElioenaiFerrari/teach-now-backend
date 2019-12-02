'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SubjectSchema extends Schema {
	up() {
		this.create('subjects', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table.string('field', 40).notNullable();
			table.string('specify', 80).notNullable();
			table.string('title', 80).notNullable();
			table.string('place', 80).notNullable();
			table.string('date', 10).notNullable();
			table.string('hours', 5).notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('subjects');
	}
}

module.exports = SubjectSchema;
