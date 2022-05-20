const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  owner: {type: String, ref: 'User'},
  value : {type: String, }
})

module.exports = model("Links", schema)