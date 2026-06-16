export interface IShowAdmin {
    id: number;
    nome: string;
    email: string;
    criadoEm: Date;
    atualizadoEm: Date;
}

export interface ICreateAdmin {
    nome: string;
    email: string;
    bilheteUnico: string;
    role: string;
    senha: string;
}

export interface IUpdateAdmin {
    nome?: string;
    email?: string;
    bilheteUnico?: string;
    senha?: string;
}

export interface IMySQLResult {
    affectedRows: number;
    insertId: number;
    warningStatus: number;
}