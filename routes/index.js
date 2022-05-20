const { Router } = require('express');
const router = Router();
const authRouter = require('./auth.routes');
const userRoutes = require('./user.routes');
const newsRoutes = require('./News.routes');
const categoryRoutes = require('./category.routes');
const coursesRoutes = require('./courses.routes');
const lessonRoutes = require('./lesson.routes');
const contactRoutes = require('./contact.routes');

router.use('/auth', authRouter);
router.use('/users', userRoutes);
router.use('/news', newsRoutes);
router.use('/category', categoryRoutes);
router.use('/courses', coursesRoutes);
router.use('/lessons', lessonRoutes);
router.use('/contact', contactRoutes);


module.exports = router;