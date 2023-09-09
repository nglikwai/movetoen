const express = require('express');
const router = express.Router();

module.exports = (wss) => {
  router.get('/', (req, res) => {
    const { clientId, message } = req.body;
    const clients = wss.clients; // Access WebSocket clients from the parameter

    // Find the specific client and send the message
    clients.forEach((client) => {
      client.send('likwai message');
    });

    res.json({ success: true, message: 'Message sent to client.' });
  });

  return router;
};
