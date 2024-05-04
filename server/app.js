const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
require('dotenv').config()
const Character = require("./models/character")

const corsOptions = {
    origin: 'https://where-is-waldo-53pnoylub-brdorads-projects.vercel.app',
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
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  console.log(req.body.name);
  const characters = await Character.findOne({ name: req.body.name }).exec();
  console.log(characters.x);
  console.log(characters.y);

  if(req.body.coordinates2){
    console.log(req.body.coordinates2.x);
    console.log(req.body.coordinates2.y);
    const distance = Math.sqrt(Math.pow(req.body.coordinates2.x - characters.x, 2) + Math.pow(req.body.coordinates2.y - characters.y, 2));
    console.log(distance)

 
      if (distance<50) {
          
          console.log("w");
          res.status(200).send(characters.name)
  }else{
    
    res.status(200).send("bad")
  }
  
}

  if(req.body.coordinates){
    console.log(req.body.coordinates.x);
    console.log(req.body.coordinates.y);

    const distance = Math.sqrt(Math.pow(req.body.coordinates.x - characters.x, 2) + Math.pow(req.body.coordinates.y - characters.y, 2));
    console.log(distance)

      if (distance<50) {
          
          console.log("w");
          res.status(200).send(characters.name)
  }else{
    
    res.status(200).send("bad")
  }
  }
});


app.listen(3000)