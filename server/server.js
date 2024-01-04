const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const cors= require('cors');
const connectDB = require('./config/db');

// dotenv config
dotenv.config();

//Mongodb Connection
connectDB();

//rest object
const app = express();

//middleware 
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use('/api/v1/user',require('./routes/userRoutes'));

//PORT
const PORT =process.env.PORT || 8000;

//PORT Listen
app.listen(PORT,()=>{
    console.log(`Server is Running in ${process.env.NODE_MODE} Mode on PORT ${PORT}`.bgCyan.white)
})