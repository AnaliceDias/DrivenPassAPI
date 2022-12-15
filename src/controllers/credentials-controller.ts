import credentialsService from "@/services/credentials-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function addCredentials(req: Request, res: Response) {
    try{
    const userId = +res.locals.userId;
    const { alias, url, username, password } = req.body;
      
    await credentialsService.searchCredentialByTitle(userId, alias);
    const encryptPassword = await credentialsService.encryptService(password);
    
    const newCredential = await credentialsService.createCredential(userId, alias, url, username, encryptPassword);
    return res.status(httpStatus.CREATED).send(newCredential);

    }catch(e) {
        if(e.name === "ConflictError") return res.status(httpStatus.CONFLICT).send(e.message);
        else return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
    
}