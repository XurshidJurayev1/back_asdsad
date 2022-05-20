const User = require('../models/User');
const ApiError = require('../ApiError/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class userController {

  async registration(req, res, next) {
    try {

      const { first_name, last_name, login, password, role } = req.body;

      const candidate = await User.findOne({ login });

      if (candidate) {
        return res.status(201).json({ message: 'Пользователь с таким login ужа существует' });
      }

      const { img } = req.files;

      if (img) {
        let fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        const hashPassword = await bcrypt.hash(password, 5);
        const user = new User({ first_name, last_name, login, password: hashPassword, role, image_path: fileName });
        await user.save();
      } else {
        const hashPassword = await bcrypt.hash(password, 5);
        const user = new User({ first_name, last_name, login, password: hashPassword, role });

        await user.save();
      }


      res.status(201).json({ login: true, message: 'User created!!!' });

    } catch (e) {
      console.log('error', e.message);
      return next(ApiError.badRequest('Что-то пошло не так'));

    }


  }

  async login(req, res, next) {
    try {

      const { login, password } = req.body;


      const user = await User.findOne({ login });

      if (!user) {
        return next(ApiError.internal('Пользоватеь не найден'));
      }

      const isMatch = await bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return next(ApiError.internal('Wrong email and password'));
      }


      const token = jwt.sign(
        { userId: user.id },
        'jhjhjhhjhjh',
        { expiresIn: '12h' },
      );


      res.json({ token, user });


    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async auth(req, res, next) {

  }

  async getAll(req, res, next) {
    try {
      const user = await User.find();
      res.status(201).json(user);
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async update(req, res, next) {

    try {
      const { password, first_name, last_name, login, links, role } = req.body;
      const { id } = req.params;
      if (password) {
        const hashPassword = await bcrypt.hash(password, 5);

        const { img } = req.files;
        console.log(img);
        if (img) {
          const old = await User.findOne({ id });
          console.log(old);
          // if (old.image_path) {
          //   fs.unlinkSync(`./static/${old.image_path}`);
          // }
          let fileName = uuid.v4() + '.jpg';
          img.mv(path.resolve(__dirname, '..', 'static', fileName));
          const user = await User.findByIdAndUpdate(
            req.params.id,
            { first_name, last_name, login, password: hashPassword, role, links, image_path: fileName },
          );
        } else {
          const user = await User.findByIdAndUpdate(
            req.params.id,
            { first_name, last_name, login, password: hashPassword, role, links },
          );
        }

      } else {
        const { img } = req.files;
        if (img) {
          const old = await User.findOne({ id });
          // if (old.image_path) {
          //   fs.unlinkSync(`./static/${old.image_path}`);
          // }
          let fileName = uuid.v4() + '.jpg';
          img.mv(path.resolve(__dirname, '..', 'static', fileName));
          const user = await User.findByIdAndUpdate(
            req.params.id,
            { first_name, last_name, login, role, links, image_path: fileName },
          );
        } else {
          const user = await User.findByIdAndUpdate(
            req.params.id,
            { first_name, last_name, login, role, links },
          );
        }

      }
      res.status(201).json({ message: 'Updated successfully!' });
    } catch (e) {
      // console.log('error', e.message);
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async deleted(req, res, next) {
    try {
      const { id } = req.params;

      // const old = await News.findOne({ id });
      // if (old.image_path) {
      //   fs.unlinkSync(path.resolve(__dirname, '..', 'static', old.image_path));
      // }

      const user = await User.findByIdAndDelete(
        id,
      );
      res.status(201).json({ message: 'Deleted successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }

  async compleateQuiz(req, res, next) {
    try {
      const { id } = req.params;
      const { course, result } = req.body;
      console.log(result);
      console.log(course);


      const user = await User.findByIdAndUpdate(
        id, {
          $push: {
            courses: {
              $each: [course], $position: 0,
            },
          },
          result,
        });
      res.status(201).json({ message: 'Compleate successfully!' });
    } catch (e) {
      return next(ApiError.badRequest('Что-то пошло не так'));
    }
  }


}

module.exports = new userController();