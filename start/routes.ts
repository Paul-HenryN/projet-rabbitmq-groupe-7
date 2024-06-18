/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import HomeController from '#controllers/home_controller'
import MessagesController from '#controllers/messages_controller'
import router from '@adonisjs/core/services/router'

router.get('/', [HomeController, 'index'])
router.post('/messages', [MessagesController, 'store'])
router.post('/signup', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
