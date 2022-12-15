import { conflictError } from "@/errors/conflictError";
import credentialsRepository from "@/repositories/credentials-repository";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

async function encryptService(objetc: string) {
    const encryptedObject = cryptr.encrypt(objetc);
    return encryptedObject;
}

async function decryptService(object: string) {
    const decryptedObject = cryptr.decrypt(object);
    return decryptedObject;
}

async function searchCredentialByTitle(userId: number, title: string) {
    const result = await credentialsRepository.findCredentialByUserId(userId, title);
    if (result) {
        throw conflictError("Invalid title");
    }

    return result;
}

async function createCredential(
    userId: number,
    title: string,
    url: string,
    username: string,
    password: string)
{
    const data = {
        userId: userId,
        title: title,
        url: url,
        username: username,
        password: password
    }

    return await credentialsRepository.createCredential(data);

}

const credentialsService = {
    encryptService,
    decryptService,
    searchCredentialByTitle,
    createCredential,
}

export default credentialsService;