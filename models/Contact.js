const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, require: true, },
  last_name: { type: String, require: true, },
  email: { type: String, },
  text: { type: String, },

});

module.exports = model('Contact', schema);