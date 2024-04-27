const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()
const Character = require("./models/character")

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
  };
  
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});


app.use(express.json());
app.use(cors(corsOptions));
app.get("/", async (req, res) => {
  try {
    const characters = await Character.find().exec();
    

    console.log(characters)
    res.send(characters);
  
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});




app.post("/", (req, res)=>{
    console.log(req.body)
})


app.listen(3000)