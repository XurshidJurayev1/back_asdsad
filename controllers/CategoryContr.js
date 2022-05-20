const Category = require('../models/Category');
const ApiError = require('../ApiError/ApiError');


class CategoryController {

  async create(req, res, next) {
    try {
      const { name, status } = req.body;


      const candi = await Category.findOne({ name });

      if (candi) {
        return res.status(201).json({ message: `${name} ужа существует` });
      }

      const obj = new Category({ name, status });


      await obj.save();

      return res.status(201).json({ message: 'Successfuly created!' });


    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }


  async getAll(req, res, next) {
    try {
      const news = await Category.find();
      res.status(201).json(news);
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async update(req, res, next) {
    try {
      const { name, status } = req.body;

      await Category.findByIdAndUpdate(
        req.params.id, { name, status },
      );
      res.status(201).json({ message: 'Updated successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete(
        id,
      );
      res.status(201).json({ message: 'Deleted successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }


}

module.exports = new CategoryController();