const clients = [];

const socketAction = (socket) => {
  console.log("A client connected");
  clients.push(socket);

  clients.forEach((client) => {
    client.send(clients.length);
  });
  socket.on("message", (message) => {
    console.log(`Received: ${message}`);
    clients.forEach((client) => {
      client.send(message.toString());
    });
  });

  socket.on("close", () => {
    console.log("A client disconnected");
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    clients.forEach((client) => {
      client.send(clients.length);
    });
  });
};

module.exports = { socketAction, clients };
