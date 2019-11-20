'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.post('/authenticate', 'UserController.authenticate')

Route.get('/app', 'AppController.index')
  .middleware(['auth'])
//usuários
Route.group(() => {
  Route.post('/users', 'UserController.store')
  Route.get('/users', 'UserController.index')
  Route.get('/users/:user_id', 'UserController.show')
  //Imagem
  Route.post('/users/images', 'ImageController.store').middleware(['auth'])
})
//matérias
Route.group(() => {
  Route.resource('subjects', 'SubjectController')
    .apiOnly()
    .middleware(['auth'])
})

Route.group(() => {
  Route.resource('comments', 'CommentController')
    .apiOnly()
    .middleware(['auth'])
})

