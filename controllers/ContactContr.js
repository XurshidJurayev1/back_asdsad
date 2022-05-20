const Contact = require('../models/Contact');
const ApiError = require('../ApiError/ApiError');


class ContactController {

  async create(req, res, next) {
    try {
      const { name, last_name, email, text } = req.body;


      const obj = new Contact({ name, last_name, email, text });


      await obj.save();

      return res.status(201).json({ message: 'Successfuly created!' });


    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }


  async getAll(req, res, next) {
    try {
      const news = await Contact.find();
      res.status(201).json(news);
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async update(req, res, next) {
    try {
      const { name, last_name, email, text} = req.body;

      const categ = await Contact.findByIdAndUpdate(
        req.params.id, { name, last_name, email, text },
      );
      res.status(201).json({ message: 'Updated successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const news = await Category.findByIdAndDelete(
        req.params.id,
      );
      res.status(201).json({ message: 'Deleted successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }


}

module.exports = new ContactController();