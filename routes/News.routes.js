const { Router } = require('express');
const router = Router();
const newsController = require('../controllers/newsContr');



router.post('/create',  newsController.create);
router.get('/get', newsController.getAll);
router.put('/:id', newsController.update);
router.delete('/:id', newsController.delete);


module.exports = router;