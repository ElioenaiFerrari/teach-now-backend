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
const Helpers = use('Helpers')

Route.post('/users', 'UserController.store')
Route.post('/authenticate', 'UserController.authenticate')

//usuários
Route.group(() => {
  //usuários
  //mostrar todos
  Route.get('/users', 'UserController.index')
  //mostrar um
  Route.get('/users/:id', 'UserController.show')
  //deletar usuário
  Route.delete('/users/:id', 'UserController.destroy')
  //matérias
  Route.resource('subjects', 'SubjectController')
    .apiOnly()
  //comentários
  Route.resource('comments', 'CommentController')
    .apiOnly()
}).middleware(['auth'])

//Envio de imagem
// Route.post('/upload', async ({ request }) => {
//   const picture = request.file('picture', {
//     types: ['image'],
//     size: '2mb'
//   })

//   await picture.move(Helpers.tmpPath('uploads'), {
//     name: Date.now().toString(),
//     overwrite: true
//   })

//   if (!picture.moved()) {
//     return picture.error()
//   }
//   return 'File moved'
// })