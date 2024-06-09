const Task = require("../models/Task");

module.exports =async (req, res) => {
  const { userId, date } = req.params;
  const task = await Task.findOne({ userId, date });
  // console.log(task);
  res.send(task);
}
