import jwt from "jsonwebtoken";

async function generateToken(userId: number) {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);
    return token;
}

const authenticationService = {
    generateToken,
}

export default authenticationService;