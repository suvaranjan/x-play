const express = require('express');
const cors = require('cors');
const connect = require("../server/db/db");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playersRoutes = require("./routes/playersRoutes");
const notificationRoutes = require('./routes/notificationRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the xplay');
});

app.use("/api", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/player", playersRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reminder', reminderRoutes);

connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
});