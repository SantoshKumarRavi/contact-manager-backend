import { AbstractRouteController } from "../AbstractRouteController";
import {Response,Request} from 'express'
import { Signup } from "../../serviceclasses/signup/Signup"; 
import { StatusConstants } from "../../constants/StatusConstants";

export class SignupController extends AbstractRouteController {

    constructor(link:string){
        super();
        this.path = '/signup';
        this.InitializeController(link);
    }

    public async runService(req: Request, resp: Response):Promise<any>{
        let response = await new Signup(req).CheckAlreadyUser()
        if(!response){
            let response = await new Signup(req).NewSignup()
            return resp.status(StatusConstants.code200).send(response)
        }
        resp.status(StatusConstants.code200).send(StatusConstants.AlreadyUser)

    }
}