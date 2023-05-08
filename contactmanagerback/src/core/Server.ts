var express = require ('express')
const mongoose = require("mongoose");
import {Express} from 'express'
import { InitializeMiddleWare } from './InitializeMiddleware';
import { InitializeRoutes } from './InitializeRoutes';

import * as ServerConfig from '@configs/ServerConfig.json'
require('dotenv').config();

export async function server() {

    let app :Express= express();

    let host = ServerConfig.host
    let port = ServerConfig.port

    let link = "http://" +host+ ":" + port.toString() 

    await InitializeMiddleWare.InitializeCommonMiddleware(app)
    await InitializeRoutes.Initialize(app,link)
    await InitializeMiddleWare.InitializeErrorHandlingMiddleware(app)

    app.listen(port, host, () => {
        console.log(
            `Server  started listening at ${host} on ${port} port.`
        )
    })
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("db connected"));


}