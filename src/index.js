const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const items = require("./routes/api/items");

const app = express();

//BodyPaser Middleware

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE,GET,HEAD,OPTIONS,POST,PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const uri = `mongodb+srv://ritikkaushik74:pass@cluster0.mpdjj.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;
//pass
//Connect mongoDb
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully to database by Mongoose"))
  .catch(err => console.log("Error Hai Bhai", err));

app.use("/api/items", items);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("connected to the Port ", PORT));
