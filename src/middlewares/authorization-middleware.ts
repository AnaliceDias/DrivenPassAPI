import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express"
import httpStatus from "http-status";
import dotenv from "dotenv";

dotenv.config();

export default function tokenValidator(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer", "").trim();
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).send("Token not found");
  }

  try {
    const user: any = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.userId = `${user.userId}`;

    next();
  } catch (e) {
    res.status(httpStatus.UNAUTHORIZED).send("Token has expired");
  }
}