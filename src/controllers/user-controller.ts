import authenticationService from "@/services/authenticationService";
import userService from "@/services/user-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function singUp(req: Request, res: Response) {
    const { email, password } = req.body;

    try{
        await userService.singUp(email, password);
        return res.sendStatus(httpStatus.CREATED);
    }catch(e){
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function singIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try{
        const user = await userService.searchUserByEmail(email);
        await userService.checkPassword(password, user.password);
        res.locals.userId = user.id;

        const token = await authenticationService.generateToken(user.id);

        res.status(httpStatus.OK).send(token);
    }catch(e){
        if(e.name === "NotFoundError") res.sendStatus(httpStatus.NOT_FOUND)
        else if(e.name === "UnauthorizedError") res.sendStatus(httpStatus.UNAUTHORIZED)
        else return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
