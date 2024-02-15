const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age: { type: String, required: true },
  hobbies: { type: [String], default: [] },
  email: { type: String, required: false },
  phone_number: { type: String, required: true },
  country: { type: String, required: false },
  is_active: { type: Boolean, default: true }
});

const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);

module.exports = Users;
