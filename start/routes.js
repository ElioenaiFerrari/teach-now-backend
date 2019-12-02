"use strict";

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
const Route = use("Route");
const Helpers = use("Helpers");

Route.post("/users", "UserController.store");
Route.post("/authenticate", "UserController.authenticate");

//usuários
Route.group(() => {
  //usuários
  Route.resource("users", "UserController")
    .apiOnly()
    .except("store");
  //matérias
  Route.resource("subjects", "SubjectController").apiOnly();
  //comentários
  Route.resource("comments", "CommentController").apiOnly();
}).middleware(["auth"]);
