
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./src/router/authRouter');
const eventRoutes = require('./src/router/eventRoutes');
const bookingRoutes = require('./src/router/bookingRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

global.io = io;

io.on('connection', (socket) => {

  socket.on('joinRoom', (organizerId) => {
    socket.join(organizerId);
    console.log(`Organizer joined room: ${organizerId}`);
  });

  socket.on('disconnect', () => {
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
