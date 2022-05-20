const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String, require: true },
  text: { type: String, require: true },
  link: { type: String },
  image_name: { type: String },
  image_path: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectID, ref: 'User', require: true },
  category_id: { type: mongoose.Schema.Types.ObjectID, ref: 'Catogory', require: true },
  joined: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }],
  is_views: { type: Number, default: 0 },
  quiz: {type: String}

});

module.exports = mongoose.model('Courses', schema);