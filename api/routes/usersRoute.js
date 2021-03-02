const {Router} = require('express');
const UsersController = require('../controllers/UserController');

const router = Router();

router.get('/users', UsersController.index);
router.post('/users', UsersController.store);
router.get('/users/:id', UsersController.show);
router.put('/users/:id', UsersController.update);
router.delete('/users/:id', UsersController.delete);

module.exports = router