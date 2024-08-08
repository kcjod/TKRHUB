require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("error",(err)=>{
    console.error(err);
});

db.on("open",()=>{
    console.log("Connected to database");
})

module.exports = db;