import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth.middleware";
import { RegisterDto } from "../types/auth.dto";

class AuthRepository {
    async register(data: RegisterDto) {
        const user = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: data.password,
            },
        });
        return user;
    }

    async updateRefreshToken(userId: string, refreshToken: string | null) {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: refreshToken,
            },
        });
        return user;
    }


    
}

export default new AuthRepository();