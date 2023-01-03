import { Router, Request, Response } from "express";
import BaseRouters from "./BaseRouter";
import validate from "../middlewares/AuthValidator";
import {auth} from "../middlewares/AuthMiddleware";

//controllers
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRouters {
    public routes(): void {
        this.router.post("/register", validate, AuthController.register);
        this.router.post("/login", validate, AuthController.login);
        this.router.get("/profile", auth, AuthController.profile);
    }
}

export default new AuthRoutes().router;