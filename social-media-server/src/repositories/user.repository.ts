import prisma from "../config/db"; 

class UserRepository {
  
    async getUserByUsername(username: string) {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        return user;
    }

    async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            omit: {
                password: true,
            }
        });
        return user;
    }
}

export default new UserRepository();