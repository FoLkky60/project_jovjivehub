const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustTaskSchema = new mongoose.Schema({
  userId: String,
  date: String,
  tasks: [
    {
      task: String,
      done: Boolean
    }
  ]
});

const CustTask = mongoose.model('CustTask', CustTaskSchema);
module.exports = CustTask