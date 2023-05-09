import { AbstractRouteController } from "../AbstractRouteController";
import { Response, Request } from "express";
import { Signup } from "../../serviceclasses/signup/Signup";
import { Login } from "../../serviceclasses/login/Login";
import { StatusConstants } from "../../constants/StatusConstants";
export class LoginController extends AbstractRouteController {
  constructor(link: string) {
    super();
    this.path = "/login";
    this.InitializeController(link);
  }

  public async runService(req: Request, resp: Response): Promise<any> {
    let response = await new Signup(req).CheckAlreadyUser();
    let isPasswordMatching = await new Login(req).BcrptyPassword_Matching();
    if (!response) {
      return resp
        .status(StatusConstants.code200)
        .send(StatusConstants.NotaUser);
    }
    if (!isPasswordMatching) {
      return resp
        .status(StatusConstants.code200)
        .send(StatusConstants.passwordNotMatch);
    }
    let auth_Details = await new Login(req).generateJWT_token(
      process.env.JWT_SECRET_KEY
    );
    resp.status(StatusConstants.code200).send(auth_Details);
  }
}
