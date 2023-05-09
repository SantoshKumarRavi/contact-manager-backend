import { Request } from "express";
const bcrypt = require("bcryptjs");
const user = require("../../../models/usermodels");
const mongoose=require("mongoose")
const contact = require("../../../datamodel/contacts");
interface ReqType {
  body: {
    email: String;
    password: String;
  };
}
interface objectUserContent {
  UserId: String;
  datas: any;
}
interface RequestType {
  params: {
    id: String;
  };
}
export class Contacts {
  public async insertData(
    data: objectUserContent[],
    id: String
  ): Promise<objectUserContent[] | undefined> {
    let updated = [...data];
    for (let i = 0; i < updated.length; i++) {
      let objUpdate = updated[i];
      objUpdate.UserId = id;
      updated[i] = objUpdate;
    }
    try {
      if (updated) {
        const up = async function () {
          await contact.insertMany(
            updated,
            function (err: string, datas: objectUserContent[]) {
              if (datas) {
                console.log("succcess uploaded");
              } else {
                throw Error(err);
              }
            }
          );
          return Promise.resolve(updated);
        };
        return await up().then(async function (x: any) {
          return await Promise.resolve([{ UserId: id, datas: x }]);
        });
      }
    } catch (err) {
      return await Promise.resolve([{ UserId: id, datas: err }]);
    }
  }
  public async findUserData(req: Request): Promise<boolean> {
    let paramId = req["params"] && req["params"]["id"];
    const strid = paramId && paramId.valueOf();
    let obj: any = {};
    if (strid) {
      obj["UserId"] = strid;
    }
    const db = await contact.find(obj).clone();
    return Promise.resolve(db);
  }
  public async deleteData(req:Request): Promise<boolean> {
    let paramId = req["params"] && req["params"]["id"];
    let strid =  paramId && paramId.valueOf();
    let deleteIdArray = req?.body;
    let db
    if(strid){
      strid=mongoose.Types.ObjectId(strid)
      db = await contact.remove({_id:strid}).clone();
    }else if(Array.isArray(deleteIdArray)){
      deleteIdArray = deleteIdArray.map((x:String) =>mongoose.Types.ObjectId(x));
      const deleted = await contact.deleteMany({ _id: { $in: deleteIdArray }})
      db=deleted
    }else{
      const deleted = await contact.deleteMany({})
      db=deleted
      }
    return Promise.resolve(db);
  }
  // public async CheckAlreadyUser(): Promise<boolean> {
  //   const existing = await user.findOne({ email: this.email });
  //   return Promise.resolve(existing !== null);
  // }
}
