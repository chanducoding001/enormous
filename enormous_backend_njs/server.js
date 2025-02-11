require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { dbConnection } = require("./config/dbConnection");
const authRoute = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000; // Provide a default port if .env is missing

// Establish DB Connection
dbConnection();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);

// Ensure DB Connection Before Server Starts
mongoose.connection.on("connected", () => {
    console.log("✅ Connected to DB successfully");

    // Start the server only when DB is connected
    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
    });
});

// Handle DB Connection Errors
mongoose.connection.on("error", (err) => {
    console.error("❌ DB Connection Error:", err);
});





// require('dotenv').config();
// const express = require("express");
// const cors = require('cors');
// const mongoose = require('mongoose');
// const {dbConnection} = require('./config/dbConnection');
// const authRoute = require('./routes/auth');

// const app  = express();
// const port = process.env.PORT;

// dbConnection();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth',authRoute);

// mongoose.connection.once('open',()=>{
//     console.log('connected to db successfully');
//     app.listen(port,()=>{
//         console.log('server started at port',port);
//     })
    
// })