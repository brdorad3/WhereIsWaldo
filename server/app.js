const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
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

app.use(bodyParser.urlencoded({ extended: false }))
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

  if (req.body.coordinates2.x >= characters.x - 15 && req.body.coordinates2.x <= characters.x + 15) {
      console.log("x-coordinate is within range");

      if (req.body.coordinates2.y >= characters.y - 50 && req.body.coordinates2.y <= characters.y + 50) {
          console.log("y-coordinate is within range");
          console.log("w");
          res.json({ w: "w" });
      }
  }}

  if(req.body.coordinates){
    console.log(req.body.coordinates.x);
    console.log(req.body.coordinates.y);

  if (req.body.coordinates.x >= characters.x - 15 && req.body.coordinates.x <= characters.x + 15) {
      console.log("x-coordinate is within range");

      if (req.body.coordinates.y >= characters.y - 50 && req.body.coordinates.y <= characters.y + 50) {
          console.log("y-coordinate is within range");
          console.log("w");
          res.json({ w: "w" });
      }
  }}

  
});


app.listen(3000)