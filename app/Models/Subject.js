'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Subject extends Model {
    students() {
        return this.hasMany('App/Models/User')
    }
}

module.exports = Subject
