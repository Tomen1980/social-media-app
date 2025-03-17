export interface LoginDto {
    username: string;
    email: string;
    password: string;
    refreshToken: string;

}

export interface RegisterDto {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}