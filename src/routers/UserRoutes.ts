import { Router, Request, Response } from "express";
import BaseRouters from "./BaseRouter";
import {auth} from "../middlewares/AuthMiddleware";

//controllers
import UserController from "../controllers/UserController";

class UserRoutes extends BaseRouters{
    public routes(): void {
        this.router.get("/", auth, UserController.index);
        this.router.post("/", UserController.create);
        this.router.get("/:id", UserController.show);
        this.router.put("/:id", UserController.update);
        this.router.delete("/:id", UserController.delete);
    }
}

export default new UserRoutes().router;