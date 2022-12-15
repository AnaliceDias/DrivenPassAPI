import httpStatus from "http-status";
import {Request, Response, NextFunction} from "express"
import userService from "../services/user-service";

export async function checkIfUserExists(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    try{
      await userService.checkUniqueEmail(email);
      next();
    }catch(e){
      if(e.name === "InvalidEmailError") return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
      else return res.sendStatus(httpStatus.NOT_FOUND);
    }
}
