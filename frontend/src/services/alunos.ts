import { data } from "react-router-dom";

const API_URL = "http://localhost:3001/api";

interface alunosInfo {
    id: number;
    nome: string;
    email: string;
    matricula: string;
    bilhete: string;
    encarregado: string;
    turma: string;
    data_nas: Date;
}

