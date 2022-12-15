import { prisma } from '@/config';

async function findCredentialByUserId(userId: number, title: string) {
    return prisma.credential.findFirst({
        where: {
            userId: userId,
            title: title
        }
    });
}

async function createCredential(data: CreateCredentialData) {
    return prisma.credential.create({
        data: { ...data }
    })
}

type CreateCredentialData = {
    userId: number,
    title: string,
    url: string,
    username: string,
    password: string
};
const credentialsRepository = {
    findCredentialByUserId,
    createCredential,
}

export default credentialsRepository;