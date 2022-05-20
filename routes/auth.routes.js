const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userContr')


router.post('/register', userController.registration)
router.post('/login', userController.login)
router.post('/auth', userController.auth)



module.exports = router




