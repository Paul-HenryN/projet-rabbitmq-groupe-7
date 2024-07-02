/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import MessagesController from '#controllers/messages_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('/messages', [MessagesController, 'store']).use(middleware.auth())
router.post('/signup', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.delete('/logout', [AuthController, 'logout']).use(middleware.auth())
router.get('/user', [AuthController, 'user']).use(middleware.auth())
router.get('/online-users', [AuthController, 'onlineUsers']).use(middleware.auth())
