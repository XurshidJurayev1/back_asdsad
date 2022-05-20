const { Router } = require('express');
const router = Router();
const CoursesController = require('../controllers/CoursesContr');


router.post('/create', CoursesController.create);
router.get('/get', CoursesController.getAll);
router.get('/get/:id', CoursesController.getOneView);
router.delete('/:id', CoursesController.delete);
router.put('/:id', CoursesController.update);
router.put('/joined/:id', CoursesController.joinedCourse);
router.put('/quiz/:id', CoursesController.addQuiz);
router.delete('/delete/:id', CoursesController.deleteQuiz)


module.exports = router;