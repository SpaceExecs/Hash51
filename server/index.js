const path = require('path');
const express = require('express');
const http = require('http');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const socketio = require('socket.io');

const { serverRouter } = require('./routes/routes');
const { passportRouter } = require('./routes/passportRoutes');
const { userRouter } = require('./routes/userRoutes');
const { PORT } = require('./config');

const port = PORT || 3000;
const distPath = path.resolve(__dirname, '../client/dist');
const app = express();
const server = http.createServer(app);

const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(distPath));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', passportRouter);
app.use('/routes', serverRouter);
app.use('/', userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

let allUsers = [];
io.on('connection', (socket) => {
  const socketJoin = () => {
    socket.join();
  };

  socket.on('userConnected', (userId) => {
    allUsers.push(userId);
    allUsers = [...new Set(allUsers)];
    io.emit('message', {
      message: `${userId} has joined chat` });
    io.emit('updateUsers', {
      users: allUsers,
    });
    socketJoin();
  });

  socket.on('userDisconnected', (userId) => {
    const toRemove = allUsers.indexOf(userId);
    allUsers.splice(toRemove, 1);
    io.emit('message', { message: `${userId} has left the chat` });
    io.emit('updateUsers', {
      users: allUsers,
    });
    socket.leave();
  });
  // broadcast to everyone else they disconnected.
  socket.on('disconnect', () => {
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`
  Listening at: http://localhost:${port}
  `);
});

module.exports = { app };
