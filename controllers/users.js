var mongoose = require('mongoose');

// The factSchema is used to embedded docs in as student doc.
// There is no model and no 'facts' collection
var listSchema = new mongoose.Schema({
  id : String
}, {
  timestamps: true
});

var studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  cohort: String,
  avatar: String,
  list : [listSchema],
  googleId: String,
  isAdmin: Boolean
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);