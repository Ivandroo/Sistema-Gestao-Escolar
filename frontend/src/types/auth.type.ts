export interface AuthLogin {
    email: string;
    senha: string;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    [key: string]: unknown;
}