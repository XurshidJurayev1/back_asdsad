const {Router} = require('express')
const router = Router()
const CategoryController = require('../controllers/CategoryContr')


router.post('/create', CategoryController.create)
router.get('/get', CategoryController.getAll)
router.delete('/:id', CategoryController.delete)
router.put('/:id', CategoryController.update)


module.exports = router