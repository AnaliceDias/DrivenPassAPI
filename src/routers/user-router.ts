import { singUP } from "../controllers/user-controller";
import schemaValidator from "../middlewares/schemaValidator-middleware";
import { createUserSchema } from "../schemas/user-schema";
import { Router } from "express";
import { checkIfUserExists } from "../middlewares/user-middleware";

const usersRouter = Router();

usersRouter.post("/singUp", schemaValidator(createUserSchema), checkIfUserExists, singUP)

export { usersRouter };
