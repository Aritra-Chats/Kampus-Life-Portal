require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const functionRoutes = require('./routes/functions');
const fileRoutes = require('./routes/files');
const app = express();

//Variables
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

// global middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/File', fileRoutes);
app.use('/api', functionRoutes);

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