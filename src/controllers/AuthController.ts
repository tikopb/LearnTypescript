import { compare } from "bcrypt";
import { Request, Response } from "express";
import Authentication from "../utils/Authentication";
const db = require("../db/models");


class AuthController{
    register = async (req: Request, res: Response): Promise<Response> => {
        let {username, password} = req.body;
        const hashedPassword: String = await Authentication.passwordHash(password);
    
        const createdUser = await db.user.create({username,password:hashedPassword});
        return res.status(200).send("register succsess");
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        //cari data user by username!
        let {username, password} = req.body;

        const users = await db.user.findOne({
            where: {username}
        })
        //check password (decrpt)
        let compare = await Authentication.passwordCompare(password, users.password);
        //generate token
        if(compare){
            let token = Authentication.generateToken(users.id, users.username, users.password);
            return res.status(200).send({token, users});
        }
        return res.status(403).send("auth failed");
    }

    profile = async (req: Request, res: Response): Promise<Response> => {
        return res.send(req.app.locals.credential)
    }
}
 
export default new  AuthController(); 