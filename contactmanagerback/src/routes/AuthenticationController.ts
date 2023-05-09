import { Request, Response, NextFunction } from "express";
import express = require("express");
import { AbstractRouteController } from "./AbstractRouteController";
import { Login } from "../serviceclasses/login/Login";
import { StatusConstants } from "../constants/StatusConstants";
export abstract class AuthenticationController extends AbstractRouteController {
  router = express.Router();
  public async InitializAuthMiddleware() {
    console.log("middle checking");
    this.router.use("/", this.InitializeAuth.bind(this)).bind(this);
  }
  public async InitializeAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { authorization } = req.headers;
    const db = await new Login(req).verifyJWT_token(
      process.env.JWT_SECRET_KEY!,
      authorization!
    );
    if (db) {
      next();
    } else {
      return res.status(StatusConstants.code200).send("not authorized");
    }
  }
}
