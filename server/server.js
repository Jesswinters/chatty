const express = require('express');
const ws = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket,
// represented by the ws parameter in the callback
wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (socket) => {
  console.log('Client connected');

  // Determine how many users are connected to the app
  let numberOfUsersOnline = wss.clients.size;
  let onlineUsers = {
    id: uuidv1(),
    numberofUsers: numberOfUsersOnline,
    type: 'numberOnlineUsers',
    update: 'User has come online',
  };

  wss.broadcast(JSON.stringify(onlineUsers));
  console.log(numberOfUsersOnline);

  // Receive message and send back a type depending on which type was received
  socket.on('message', function incoming(message) {
    const serverMessage = JSON.parse(message);
    serverMessage.id = uuidv1();
    console.log(serverMessage);

    if (serverMessage.type === 'postMessage') {
      serverMessage.type = 'incomingMessage';
    }

    if (serverMessage.type === 'postNotification') {
      serverMessage.type = 'incomingNotification';
    }

    console.log(serverMessage.type);
    wss.broadcast(JSON.stringify(serverMessage));
  });

  // Set up a callback for when a client closes the socket
  // This usually means they closed their browser
  socket.on('close', () => {
    numberOfUsersOnline = wss.clients.size;
    onlineUsers = {
      numberofUsers: numberOfUsersOnline,
      type: 'numberOnlineUsers',
      update: 'User has gone offline',
    };

    wss.broadcast(JSON.stringify(onlineUsers));

    console.log('Client disconnected');
  });
});
