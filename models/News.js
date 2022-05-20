const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: {type: String, require: true},
  content: {type: String, require:true },
  link: {type: String},
  image_name: {type: String},
  image_path: {type: String}
})

module.exports = model("News", schema)