
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const { connectToDatabase } = require("./models/db");


dotenv.config();
const app = express();

// db connection
connectToDatabase();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


// Chitranshu testing the server 
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});


app.listen(3000, ()=>{
  console.log("Server running on the network");
})


