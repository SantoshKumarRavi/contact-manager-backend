const express = require("express");
const router = express.Router();
const contact = require("../../datamodel/contacts");
const bodyParser = require("body-parser");

// const fileupload = require("express-fileupload");
const path = require("path");
// router.use(fileupload());
const cors = require("cors");

router.use(cors());

router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());
router.post("/contacts", async (req, res) => {
    let updated = req.body.data;
    let id = req.body.userId;
    for (let i = 0; i < updated.length; i++) {
      let objUpdate = updated[i];
      objUpdate.UserId = id;
      updated[i] = objUpdate;
    }
    await contact.insertMany(updated, function (err, datas) {
      if (err) {
        console.log(err);
      }
      res.send(JSON.stringify({ message: "sucessfully saved", data: datas }));
    });
  });

  router.get("/contacts/:id", async (req, res) => {
    let paramId = req.params["id"];
    const strid = paramId.valueOf();
    await contact
      .find({ UserId: strid }, function (err, datas) {
        if (err) {
          console.log(err);
        }
        res.send(JSON.stringify({ message: "sucessfully fetched", data: datas }));
      }).clone();
  });

  router.delete("/contacts", async (req, res) => {
    let deleteIdArray = req.body;
    deleteIdArray = deleteIdArray.map((x) => mongoose.Types.ObjectId(x));
    await contact
      .deleteMany({ _id: { $in: deleteIdArray } }, function (err, delCount) {
        if (err) {
          console.log(err);
        }
        res.send(
          JSON.stringify({ message: "sucessfully deletes", data: delCount })
        );
      }).clone();
  });

router.delete("/emptycontacts", async (req, res) => {
  //temporary api call for delete // by putting if req.body,we can make one api call for delete and delerte all..
  await contact
    .deleteMany({}, function (err, delCount) {
      if (err) {
        console.log(err);
      }
      res.send(
        JSON.stringify({ message: "sucessfully deleted all", data: delCount })
      );
    }).clone();
});

module.exports = router;
