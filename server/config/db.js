const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true, // Ensure this option is included
        });
        console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`MongoDb Server Issue ${error}`.bgRed.white);
    }
};

module.exports = connectDB;
