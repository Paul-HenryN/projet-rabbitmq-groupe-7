/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import HomeController from '#controllers/home_controller'
import router from '@adonisjs/core/services/router'

router.get('/', [HomeController, 'index'])
