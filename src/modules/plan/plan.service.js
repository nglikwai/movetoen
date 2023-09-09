const ExcelJS = require("exceljs");
const { getAllTodos } = require("../todo/todo.service");
const { TodoStatus, TodoUrgent } = require("../../constants");
const exportPlan = async (planId) => {
  const todos = await getAllTodos(planId);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Todos");

  worksheet.columns = [
    { header: "Person", key: "person", width: 20 },
    { header: "Title", key: "title", width: 20 },
    { header: "Description", key: "description", width: 40 },
    { header: "Status", key: "status", width: 20 },
    { header: "Urgent", key: "urgent", width: 20 },
    { header: "Created At", key: "createdAt", width: 20 },
    { header: "Deadline", key: "deadline", width: 20 },
    // Add other columns as needed
  ];

  todos.forEach((todo) => {
    worksheet.addRow({
      person: todo.person,
      title: todo.title,
      description: todo.description,
      status: TodoStatus[todo.status],
      urgent: TodoUrgent[todo.urgent],
      createdAt: todo.createdAt,
      deadline: todo.deadline,
    });
  });

  return workbook;
};

module.exports = {
  exportPlan,
};
