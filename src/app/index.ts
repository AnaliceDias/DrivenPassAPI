import express , {json, Express} from "express";
import cors from "cors";
import { usersRouter } from "../routers";
import { connectDb } from "@/config";

const app = express();


app.use(cors())
    .use(json())
    .use("/user", usersRouter)

export default app;

export function init(): Promise<Express> {
    connectDb()
 return Promise.resolve(app);
}