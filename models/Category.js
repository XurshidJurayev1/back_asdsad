const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, require: true, unique: true},
  status: {type: String, require: true, default: false}

})

module.exports = model("Category", schema)