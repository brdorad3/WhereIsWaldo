const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
require('dotenv').config()
const Character = require("./models/character");
const character = require("./models/character");

const corsOptions = {
    origin: 'https://where-is-waldo-gfa1l20u8-brdorads-projects.vercel.app',
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
  ("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});


app.use(express.json());

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  try {
    const characters = await Character.findOne({name: "Waldo"});

   res.send("w")
  
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/", async (req, res) => {
  
  const characters = await Character.findOne({ name: req.body.name });

  if(req.body.coordinates){
    const xp = characters.xp
    const yp = characters.yp;
    const x = req.body.coordinates.x
    const y = req.body.coordinates.y

    if(x > xp - 3 && x < xp + 3){
      if(y > yp - 3 && y < yp + 3){
        res.status(200).send(characters.name)
      }else{
    
        res.status(200).send("bad")
      }
    }else{
    
      res.status(200).send("bad")
    }

  }
});

app.listen(3000)