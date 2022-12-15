import httpStatus from "http-status";
import {Request, Response, NextFunction} from "express"
import { ObjectSchema } from "joi";


export default function schemaValidator<T>(schema: ObjectSchema<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body, { abortEarly: false })
      if (error) {
        return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
      }
  
      next()
    }
  }