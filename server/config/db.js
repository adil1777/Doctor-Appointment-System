const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            retryWrites: true,
            w: 'majority',
        });
        console.log(`Mongodb connected ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`MongoDb Server Issue ${error}`);
    }
};

module.exports = connectDB;
