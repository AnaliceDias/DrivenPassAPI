import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function generateToken(userId: number) {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);
    return token;
}

const authenticationService = {
    generateToken,
}

export default authenticationService;