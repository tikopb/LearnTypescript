import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IController from "./Controllerinterface";

let data: any[] = [
    { id: 1, name: "adi"},
    { id: 2, name: "budi"},
    { id: 3, name: "ana"},
    { id: 4, name: "fahma"},
];

class UserController implements IController{
    index(req: Request, res: Response): Response {
        return res.send(data);
    }
    create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
        const {id,name} = req.body;

        data.push({id,name,}) 
        return res.send("create succsess");
    }
    show(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
        const { id } = req.params;
        let person = data.find(item => item.id == id);
        return res.send(person)

    }
    update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
        const {id} = req.params
        const {name} = req.body

        let person = data.find(item => item.id == id);
        person.name = name;
        return res.send(person);
    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
        const {id} = req.params;
        const {name} = req.body;

        let person = data.filter(item => item.id != id);

        return res.send(person);
    }

}

export default new  UserController();