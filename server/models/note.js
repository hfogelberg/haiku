let mongoose = require('mongoose');

const Note = mongoose.model('Note', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  created: {
    type: String
  },
  edited: {
    type: String
  },
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  }
});


module.exports = { Note }
