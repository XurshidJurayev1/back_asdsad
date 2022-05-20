const {Router} = require('express')
const router = Router()
const LessonsController = require('../controllers/LessonsContr')


router.post('/create', LessonsController.create)
router.get('/get', LessonsController.getAll)
router.delete('/:id', LessonsController.delete)
router.put('/:id', LessonsController.update)


module.exports = router