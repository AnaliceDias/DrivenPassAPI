import { addCredentials } from "@/controllers/credentials-controller";
import tokenValidator from "@/middlewares/authorization-middleware";
import { createCredential } from "@/schemas/credentials-schema";
import { Router } from "express";
import schemaValidator from "../middlewares/schemaValidator-middleware";

const credentialsRouter = Router();

credentialsRouter
    .all("/", tokenValidator)
    .post("/", schemaValidator(createCredential), addCredentials)

export { credentialsRouter };