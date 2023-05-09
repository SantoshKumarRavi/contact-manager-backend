import { Express } from "express";
import { SignupController } from "../routes/authentication/SignupController";
import { LoginController } from "../routes/authentication/LoginController";
import { ContactsController } from "../routes/contacts/ContactsController";
import { AbstractRouteController } from "../routes/AbstractRouteController";

export class InitializeRoutes {
  public static async Initialize(app: Express, link: string) {
    let routes = await this.getRoutes(link);
    routes.forEach((rc) => {
      app.use("/", rc.router);
    });
  }
  public static async getRoutes(
    link: string
  ): Promise<Array<AbstractRouteController>> {
    let routes: Array<AbstractRouteController> = [];
    routes.push(new SignupController(link));
    routes.push(new LoginController(link));
    routes.push(new ContactsController(link));
    return Promise.resolve(routes);
  }
}
