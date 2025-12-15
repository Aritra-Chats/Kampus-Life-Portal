require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const functionRoutes = require('./routes/functions');
const fileRoutes = require('./routes/files');
const authRoute = require('./routes/auth');
const CookieParser = require('cookie-parser');
const app = express();

//Variables
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

// global middleware
app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(CookieParser());

//routes
app.use('/File', fileRoutes);
app.use('/api', functionRoutes);
app.use('/auth', authRoute);

// connect to db
mongoose.connect(URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to db & Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });