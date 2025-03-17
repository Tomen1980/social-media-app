import dotenv from 'dotenv';

dotenv.config();

const config = {
    jwt: {
        secret: process.env.JWT_SECRET ,
        accessTokenExpires: process.env.JWT_ACCESS_EXPIRES ,
        refreshTokenExpires: process.env.JWT_REFRESH_EXPIRES 
    },
    bcrypt: {
        saltRounds: process.env.BCRYPT_SALT_ROUNDS
    },
    cookie:{
        accessTokenExpires: process.env.COOKIE_ACCESS_TOKEN_EXPIRES,
        refreshTokenExpires: process.env.COOKIE_REFRESH_TOKEN_EXPIRES
    }
};

export default config;