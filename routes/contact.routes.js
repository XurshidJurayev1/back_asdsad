const {Router} = require('express')
const router = Router()
const ContactController = require('../controllers/ContactContr')


router.post('/create', ContactController.create)
router.get('/get', ContactController.getAll)
router.delete('/:id', ContactController.delete)
router.put('/:id', ContactController.update)


module.exports = router