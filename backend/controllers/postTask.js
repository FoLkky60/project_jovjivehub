const Task = require("../models/Task");

module.exports =async (req, res) => {
    const { userId, date, tasks } = req.body;
    let task = await Task.findOne({ userId, date });
    if (task) {
      task.tasks = tasks;
    } else {
      task = new Task({ userId, date, tasks });
    }
    await task.save();
    res.send(task);
  }
