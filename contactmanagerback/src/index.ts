export const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
export const mongoose = require("mongoose");
export const contact = require("../datamodel/contacts");
export const bodyParser = require("body-parser");
export const cors = require("cors");
const auth_routes = require("../routes/authentication/authenticate");
const contacts_routes=require("../routes/contacts/contacts")
require('dotenv').config();

app.use(auth_routes);
app.use(contacts_routes);

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(
  cors({
    origin: "*",
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
mongoose.connect(
process.env.MONGODB_URI
  )
  .then(() => console.log("db connected"));
// module.exports ={
//   express:express,
//   contact:contact,
//   bodyParser:bodyParser,
//   cors:cors
// }