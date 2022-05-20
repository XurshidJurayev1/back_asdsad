const Lesson = require('../models/Lessons');
const ApiError = require('../ApiError/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const News = require('../models/News');


class CategoryController {

  async create(req, res, next) {
    try {
      const { title, text, link, course } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const obj = new Lesson({ title, text, link, course, image_path: fileName });
      await obj.save();
      return res.status(201).json({ message: 'Successfuly created!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }


  async getAll(req, res, next) {
    try {
      const news = await Lesson.find();
      res.status(201).json(news);
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async update(req, res, next) {
    try {
      const { title, text, link, course } = req.body;
      const { img } = req.files;
      if (img) {
        const old = await News.findOne({ id });
        fs.unlinkSync(`./static/${old.image_path}`);
        let fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        const categ = await Lesson.findByIdAndUpdate(req.params.id, {
          title,
          text,
          link,
          course,
          image_path: fileName,
        });
      } else {
        const categ = await Lesson.findByIdAndUpdate(req.params.id, { title, text, link, course });
      }

      res.status(201).json({ message: 'Updated successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const news = await Lesson.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: 'Deleted successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }


}

module.exports = new CategoryController();