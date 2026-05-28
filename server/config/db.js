const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('bufferCommands', false);

const MAX_RETRIES = 12;
let retryCount = 0;

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://WeCode_Users:WeCode234@wecode.9w3wipp.mongodb.net/WeCode?retryWrites=true&w=majority&appName=WeCode",
            {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            }
        );

        retryCount = 0;
        console.log('MongoDB connected');

    } catch (err) {
        retryCount += 1;

        console.error('MongoDB connection error:', err.message);

        if (retryCount >= MAX_RETRIES) {
            console.error(
                'MongoDB: max retries reached. Check Atlas IP whitelist and MONGO_URI, then restart the server.'
            );
            return;
        }

        console.log(`Retrying connection in 5 seconds... (${retryCount}/${MAX_RETRIES})`);

        setTimeout(connectDB, 5000);
    }
};

module.exports = connectDB;