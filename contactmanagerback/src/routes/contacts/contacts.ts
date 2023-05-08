import { Request, Response } from 'express'
const data= require("../../src/index.ts");
const userAuthentication = require("../../middlewares/jwt-authentication");
const router = data.express.Router();
router.use(data.cors());
router.use(data.bodyParser.urlencoded({ extended: false }));
// parse application/json
interface contactObj {
  Company:String,
  Country:String,
  Designation:String,
  Email:String,
  Industry:String,
  Name: String,
  Phonenumber: String
}
interface postContact {
  data: contactObj[];
  userId:String
}
router.use("/", userAuthentication);
router.use(data.bodyParser.json());
router.post("/contacts", async (req:Request, res:Response) => {

    let updated = req.body.data;
    let id = req.body.userId;
    for (let i = 0; i < updated.length; i++) {
      let objUpdate = updated[i];
      objUpdate.UserId = id;
      updated[i] = objUpdate;
    }
    await  data.contact.insertMany(updated, function (err:Object, datas:postContact) {
      if (err) {
        console.log(err);
      }
      res.send(JSON.stringify({ message: "sucessfully saved", data: datas }));
    });
  });

  router.get("/contacts/:id", async (req:Request, res:Response) => {
    let paramId = req.params["id"];
    const strid = paramId.valueOf();
    await  data.contact
      .find({ UserId: strid }, function (err:Object, datas:postContact) {
        if (err) {
          console.log(err);
        }
        res.send(JSON.stringify({ message: "sucessfully fetched", data: datas }));
      }).clone();
  });

  router.delete("/contacts", async (req:Request, res:Response) => {
    let deleteIdArray = req.body;
    deleteIdArray = deleteIdArray.map((x:String) => data.mongoose.Types.ObjectId(x));
    await  data.contact
      .deleteMany({ _id: { $in: deleteIdArray } }, function (err:Object, delCount:Number) {
        if (err) {
          console.log(err);
        }
        res.send(
          JSON.stringify({ message: "sucessfully deletes", data: delCount })
        );
      }).clone();
  });

router.delete("/emptycontacts", async (req:Request, res:Response) => {
  //temporary api call for delete // by putting if req.body,we can make one api call for delete and delerte all..
  await  data.contact
    .deleteMany({}, function (err:Object, delCount:Number) {
      if (err) {
        console.log(err);
      }
      res.send(
        JSON.stringify({ message: "sucessfully deleted all", data: delCount })
      );
    }).clone();
});

module.exports = router;
