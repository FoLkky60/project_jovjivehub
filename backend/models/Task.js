const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new mongoose.Schema({
  userId: String,
  date: String,
  tasks: [
    {
      task: String,
      done: Boolean
    }
  ]
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task