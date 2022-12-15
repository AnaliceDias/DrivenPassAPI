import { prisma } from '@/config';

async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

async function createUser(email: string, password: string) {
    const data = {
        email: email,
        password: password
    }
    return prisma.user.create({data});
}

const userRepository = {
    findUserByEmail,
    createUser
}

export default userRepository;