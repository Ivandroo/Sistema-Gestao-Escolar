export interface IShowAluno {
    id: number;
    nome: string;
    email: string;
}

export interface ICreateAluno {
    nome: string;
    email: string;
    bilheteUnico: string;
}

export interface IUpdateAluno {
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