const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
  courses: [{ type: Types.ObjectId, ref: 'courses' }],
  telephone: { type: Number },
  position: { type: String },
  role: [{ type: String, required: true, default: 'USER' }],
  image_name: { type: String },
  image_path: { type: String },
});

module.exports = model('User', schema);

