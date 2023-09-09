const socketController = require("./src/modules/socket/controller");

const { socketAction } = require("./web-socket");

module.exports = (app, wss) => {
  app.use("/todos", require("./src/modules/todo/todo.controller"));
  app.use("/loggers", require("./src/modules/logger/logger.controller"));
  app.use("/plans", require("./src/modules/plan/plan.controller"));
  app.use("/sockets", socketController(wss));
  app.use("/questions", require("./src/modules/question/question.controller"));
  app.use("/categories", require("./src/modules/category/category.controller"));
  app.use("/luggages", require("./src/modules/luggage/luggage.controller"));
  wss.on("connection", socketAction);
};
