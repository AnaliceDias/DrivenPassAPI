import { invalidEmailError } from "../errors/invalidEmail-error";
import userRepository from "../repositories/user-repository";
import bcrypt from "bcrypt";
import { notFoundError } from "@/errors/notFoundError";
import { unauthorizedError } from "@/errors/unauthorizedError";

async function checkUniqueEmail(email: string) {
    const result = await userRepository.findUserByEmail(email);

    if (result) {
        throw invalidEmailError(email);
    }

    return result;
}

async function singUp(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await userRepository.createUser(email, hashedPassword);
    return newUser;
}

async function searchUserByEmail(email: string) {
    const result = await userRepository.findUserByEmail(email);

    if (!result) {
        throw notFoundError();
    }

    return result;
}

async function checkPassword(password: string, hashedPassword: string) {
    const passwordVerified = bcrypt.compareSync(password, hashedPassword);
    if (!passwordVerified) {
        throw unauthorizedError();
    }
}

const userService = {
    checkUniqueEmail,
    singUp,
    searchUserByEmail,
    checkPassword,
}

export default userService;