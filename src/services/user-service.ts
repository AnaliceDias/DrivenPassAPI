import { invalidEmailError } from "../errors/invalidEmail-error";
import userRepository from "../repositories/user-repository";
import bcrypt from "bcrypt";
import { notFoundError } from "@/errors/notFoundError";

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

const userService = {
    checkUniqueEmail,
    singUp,
    searchUserByEmail,
}

export default userService;