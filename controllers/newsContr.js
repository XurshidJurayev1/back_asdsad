const News = require('../models/News');
const ApiError = require('../ApiError/ApiError');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class newsController {

  async create(req, res, next) {
    try {
      const { title, content, link } = req.body;
      const { img } = req.files;
      if (img) {
        let fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        new News({ title, content, link, image_path: fileName }).save();
      }

      new News({ title, content, link }).save();

      return res.status(200).json({ message: `Быль создон` });

    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }


  async getAll(req, res, next) {
    try {
      const news = await News.find();
      res.status(201).json(news);
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, link } = req.body;
      const { img } = req.files;
      if (img) {
        const old = await News.findOne({ id });
        fs.unlinkSync(`./static/${old.image_path}`);
        let fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        const updated = await News.findByIdAndUpdate(id, { title, content, link, image_path: fileName });
      } else {
        const updated = await News.findByIdAndUpdate(id, { title, content, link });
      }


      res.status(201).json({ message: 'Updated successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      // const old = await News.findOne({ id });
      // if (old.image_path) {
      //   fs.unlinkSync(path.resolve(__dirname, '..', 'static', old.image_path));
      // }

      await News.findByIdAndDelete(id);
      res.status(201).json({ message: 'Deleted successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }


}

module.exports = new newsController();