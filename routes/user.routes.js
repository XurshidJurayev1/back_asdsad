const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userContr')


router.get('/get', userController.getAll)
router.delete('/:id', userController.deleted)
router.put('/:id', userController.update)
router.put('/complete/:id', userController.compleateQuiz)


module.exports = router