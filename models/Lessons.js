const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String, require: true},
  text: {type: String, require: true },
  link: {type: String},
  image_name: {type: String},
  image_path: {type: String},
  course: {type: mongoose.Schema.Types.ObjectID, ref: 'courses', require: true}

})

module.exports = mongoose.model("Lesson", schema)