import { singIn, singUp } from "../controllers/user-controller";
import schemaValidator from "../middlewares/schemaValidator-middleware";
import { createUserSchema, singInSchema } from "../schemas/user-schema";
import { Router } from "express";
import { checkIfUserExists } from "../middlewares/user-middleware";

const usersRouter = Router();

usersRouter
    .post("/singUp", schemaValidator(createUserSchema), checkIfUserExists, singUp)
    .post("/singIn", schemaValidator(singInSchema), singIn)

export { usersRouter };
