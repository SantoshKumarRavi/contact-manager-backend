import { AbstractRouteController } from "../AbstractRouteController";
import { Response, Request } from "express";
import { Contacts } from "../../serviceclasses/contacts/Contacts";
import { StatusConstants } from "../../constants/StatusConstants";
import { AuthenticationController } from "../AuthenticationController";
export class ContactsController extends AuthenticationController {
  constructor(link: string) {
    super();
    this.path = "/contacts/:id?";
    this.InitializAuthMiddleware();
    this.InitializeController(link);
    this.InitializeDeleteController(link);
  }
  public async InitializeDeleteController(link: string) {
    console.log("checking Delete", link + this.path);
    await this.InitializeDelete();
  }
  public async InitializeDelete() {
    this.router.delete(this.path, this.runService.bind(this)).bind(this);
  }
  public async runService(req: Request, resp: Response): Promise<any> {
    let response;
    if (req.method == "GET") {
      response = await new Contacts().findUserData(req);
    } else if (req.method == "POST") {
      response = await new Contacts().insertData(
        req.body.data,
        req.body.userId
      );
    } else if (req.method == "DELETE") {
      response = await new Contacts().deleteData(req);
    }

    return resp.status(StatusConstants.code200).send(response);
  }
}
