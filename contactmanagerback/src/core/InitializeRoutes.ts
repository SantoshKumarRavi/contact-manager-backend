import { Express } from 'express'
import { HelloWorldRouteController } from '../routes/helloworld/HelloWorldRouteController'
import { SignupController } from '../routes/authentication/SignupController'

import { AbstractRouteController } from '../routes/AbstractRouteController'

export class InitializeRoutes {
    public static async Initialize(app: Express, link: string) {
        let routes = await this.getRoutes(link)
        routes.forEach(rc => {
            app.use("/", rc.router)
        })
    }
    public static async getRoutes(link: string): Promise<Array<AbstractRouteController>> {
        let routes: Array<AbstractRouteController> = []
        routes.push(new HelloWorldRouteController(link))
        routes.push(new SignupController(link))
        return Promise.resolve(routes)
    }
}