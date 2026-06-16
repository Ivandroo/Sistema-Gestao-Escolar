import { CreateUsuario } from "../types/usuario.type";

const API_URL = 'http://localhost:3001/api'

export const usuarioService = {

    async create(data: CreateUsuario): Promise<{ message: string; id?: number}> {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })

        const result = await response.json()

        // Se o Zod rejeitar no backend, capturamos o erro aqui
        if (!response.ok) {
            const errorMessage = result.error || result.message || 'Erro ao processar dados no servidor';
            throw new Error(errorMessage);
        }

        return result;
    }
}