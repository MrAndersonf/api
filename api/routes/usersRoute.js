const {Router} = require('express');
const UsersController = require('../controllers/UserController');
const passport = require('passport')

const router = Router();

router.get('/users', UsersController.index);
router.post('/users', UsersController.store);
router.get('/users/:id', UsersController.show);
router.put('/users/:id', UsersController.update);
router.delete('/users/:id', UsersController.delete);
router.post('/users/restore/:id', UsersController.restore);
router.post('/users/login',passport.authenticate('local',{session:false}),UsersController.login)

module.exports = router