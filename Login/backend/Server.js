require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');

const app = express();

const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use(authRoute);

mongoose.connect(URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to db & Server is running on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })