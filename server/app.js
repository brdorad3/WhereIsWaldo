const express = require("express");
const app = express();
const cors = require("cors")

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
  };

app.use(express.json());
app.use(cors(corsOptions));


app.get("/", (req, res)=>{
    res.send("w")
})

app.post("/", (req, res)=>{
    console.log(req.body)
})


app.listen(3000)