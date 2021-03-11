const {Router} = require('express');
const UsersController = require('../controllers/UserController');
const passport = require('passport')
const midlewareAuth = require('../Auth/midleware')

const router = Router();

router.get('/users', UsersController.index);
router.post('/users', UsersController.store);
router.get('/users/:id', UsersController.show);
router.put('/users/:id', UsersController.update);
router.delete('/users/:id', midlewareAuth.bearer, UsersController.delete);
router.post('/users/restore/:id', UsersController.restore);
router.post('/users/login',midlewareAuth.local, UsersController.login)
router.post('/users/logout',midlewareAuth.bearer, UsersController.logout)

module.exports = router