const express = require('express');
const router = express();

const { UserController } = require('../Controllers/UserController');
const { isAuthorized } = require('../Middlewares/isAuthorizedMiddleware')
const { isAdmin } = require('../Middlewares/isAdminMiddleware')



router.put('/update_data',  UserController.updateUserData)
router.delete('/delete_me', isAdmin, UserController.deleteUser)
router.get('/user_profile', isAuthorized ,UserController.getUserData)

router.get('/' ,isAdmin,UserController.getAllUsers)

module.exports = router;
