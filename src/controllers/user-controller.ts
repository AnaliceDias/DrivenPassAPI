import userService from "@/services/user-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function singUP(req: Request, res: Response) {
    const { email, password } = req.body;

    try{
        await userService.singUP(email, password);
        return res.sendStatus(httpStatus.CREATED);
    }catch(e){
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

}