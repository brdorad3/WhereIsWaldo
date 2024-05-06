const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
require('dotenv').config()
const Character = require("./models/character")

const corsOptions = {
    origin: 'https://where-is-waldo-49hhmnd5d-brdorads-projects.vercel.app',
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

    res.send("w");
  
  } catch (error) {
    
    res.status(500).send(error);
  }
});

app.post("/", async (req, res) => {
  const characters = await Character.findOne({ name: req.body.name }).exec();

  if(req.body.coordinates2){

    const distance = Math.sqrt(Math.pow(req.body.coordinates2.x - characters.x, 2) + Math.pow(req.body.coordinates2.y - characters.y, 2));
 
      if (distance<50) {
          
          res.status(200).send(characters.name)
  }else{
    
    res.status(200).send("bad")
  }
  
}
  if(req.body.coordinates){

    const distance = Math.sqrt(Math.pow(req.body.coordinates.x - characters.x, 2) + Math.pow(req.body.coordinates.y - characters.y, 2));
    

      if (distance<50) {
          
          res.status(200).send(characters.name)
  }else{
    
    res.status(200).send("bad")
  }
  }
});

app.listen(3000)