export interface ILoginAuth {
    email: string;
    senha: string;
}

export interface IVerifyAuth {
    email: string;
    role: string;
    senha: string;
}

export interface IMySQLResult {
    affectedRows: number;
    insertId: number;
    warningStatus: number;
}