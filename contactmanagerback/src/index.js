const express = require("express");
const app = express();
const port = 8081;
const mongoose=require("mongoose")
const contact = require("../datamodel/contacts");
const bodyParser = require("body-parser");
const routes=require("../routes/userRoutes")
app.use(routes);

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.post("/contacts", async(req, res) => {
  await contact.insertMany(req.body, function (err, datas) {
    if (err) {
      console.log(err);
    };
    res.send(JSON.stringify({message:"sucessfully saved",data:datas}));
  });
});

app.get("/contacts", async(req, res) => {
  await contact.find({}, function (err, datas) {
    if (err) {
      console.log(err);
    };
    res.send(JSON.stringify({message:"sucessfully saved",data:datas}));
  }).clone()
});

app.delete("/contacts", async(req, res) => {
  // model.deleteMany({_id: { $in: _ids}}, function(err) {})
  let deleteIdArray=req.body
  console.log("from back deletearray",deleteIdArray)
  deleteIdArray=deleteIdArray.map((x)=>mongoose.Types.ObjectId(x))
  // console.log(deleteIdArray)
  await contact.deleteMany({"_id":{$in:deleteIdArray}}, function (err, delCount) {
    if (err) {
      console.log(err);
    };
    res.send(JSON.stringify({message:"sucessfully deletes",data:delCount}));
  }).clone();
})

//this is now i used for postman deleteall ...
app.delete("/emptycontacts", async(req, res) => { //temporary api call for delete // by putting if req.body,we can make one api call for delete and delerte all..
  // model.deleteMany({_id: { $in: _ids}}, function(err) {})
  // console.log(deleteIdArray)
  await contact.deleteMany({}, function (err, delCount) {
    if (err) {
      console.log(err);
    };
    res.send(JSON.stringify({message:"sucessfully deleted all",data:delCount}));
  }).clone();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect('mongodb+srv://santhosh:santhosh@cluster0.ltz9vim.mongodb.net/contactsdb?retryWrites=true&w=majority')
.then(()=>console.log("db connected"));
