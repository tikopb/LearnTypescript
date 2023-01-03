import {Request,Response,NextFunction, request} from "express";
import {check, validationResult} from "express-validator";

const validate = [
    check('username').isString(),
    check('password').isLength({min:8}).withMessage('must be 8 character longh'),
    (req: Request, res: Response, next: NextFunction) =>{
        const erorr= validationResult(req);
        
        if(!erorr.isEmpty()){
            return res.status(422).send({ erorr: erorr.array()});
        }

        next();
    }
]

export default validate;