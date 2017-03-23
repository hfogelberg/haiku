let mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  haiku: {
    type: String,
    trim: true
  },
  imagePath: {
    type: String,
    minlength: 1,
    trim: true
  },
  comment: {
    type: String,
    minlength: 1,
    trim: true
  },
  isPriority: {
    type: Boolean,
    default: false
  },
  display: {
    type: Boolean,
    default: true
  },
  created:  {
    type: Date,
    default: Date.now
  },
});

let Image = mongoose.model('Image', ImageSchema);
module.exports = { Image }
