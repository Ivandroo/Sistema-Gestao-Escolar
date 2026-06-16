export interface IShowUsuario {
    id: number;
    nome: string;
    email: string;
    nBilhete: string;
    role: string;
}

export interface ICreateUsuario {
    nome: string;
    email: string;
    nBilhete: string;
    role: string;
    senha: string;
}

export interface IMySQLResult {
    affectedRows: number;
    insertId: number;
    warningStatus: number;
}