const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({  limit: "30mb", extended: true }));
app.use(bodyParser.json());
require("dotenv").config();

const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  encrypted: true,
});

  

app.post("/message", (req, res) => {
  const message = req.body.message;
  const channel = req.query.channel;

  
  pusher.trigger(channel, "message", message);
  res.send({
    message: `Message from `,
    status:200,
    data: message,
  });
});


const port = 4000
app.listen(port, () => {
  console.log(`Server connected on ${port} Port only`)
})