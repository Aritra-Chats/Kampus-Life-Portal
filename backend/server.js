require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const functionRoutes = require('./routes/functions');
const fileRoutes = require('./routes/files');
const authRoute = require('./routes/auth');
const Admin = require('./models/adminModel');
const CookieParser = require('cookie-parser');
const app = express();

const DEFAULT_ANNOUNCEMENT_AGE_DAYS =
    Number.isFinite(Number(process.env.ANNOUNCEMENT_DEFAULT_AGE_DAYS)) && Number(process.env.ANNOUNCEMENT_DEFAULT_AGE_DAYS) > 0
        ? Number(process.env.ANNOUNCEMENT_DEFAULT_AGE_DAYS) : 1;

const backfillAnnouncementExpiry = async () => {
    const announcementsWithoutExpiry = await Admin.find({ expiresAt: { $exists: false } },{ _id: 1, age: 1, createdAt: 1 }).lean();
    if (announcementsWithoutExpiry.length) {
        const operations = announcementsWithoutExpiry.map((announcement) => {
            const createdAt = announcement.createdAt ? new Date(announcement.createdAt) : announcement._id.getTimestamp();
            const ageInDays = Number.isFinite(Number(announcement.age)) && Number(announcement.age) > 0
                ? Number(announcement.age) : DEFAULT_ANNOUNCEMENT_AGE_DAYS;
            const expiresAt = new Date(createdAt.getTime() + ageInDays * 24 * 60 * 60 * 1000);
            return { updateOne: {filter: { _id: announcement._id },update: { $set: { expiresAt } }}};
        });
        if (operations.length) await Admin.bulkWrite(operations);
    }
    await Admin.deleteMany({ expiresAt: { $lte: new Date() } });
};

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
mongoose.connect(URI).then(async () => {
        await backfillAnnouncementExpiry();
        app.listen(PORT, () => { console.log(`Connected to db & Server is running on port ${PORT}`); });
    }).catch((error) => { console.log(error); });