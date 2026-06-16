import { FastifyInstance } from "fastify";
import { UsuarioController } from "../controllers/usuario.controller.ts";
import { z } from "zod";

export async function usuariosRoutes(fastify: FastifyInstance) {
    const usuarioController = new UsuarioController(fastify)

    fastify.post (
        "/", {
            schema: {
                body: z.object({
                    nome: z.string() .max(100) .min(2, "o nome precisa ter 2 caracteres"),
                    email: z.string() .email("O email precisa ser válido"),
                    nBilhete: z.string().max(50),
                    role: z.enum(["ALUNOS", "RESPONSAVEL", "PROFESSORES", "ADMINISTRADORES"]),
                    senha: z.string() .max(100) .min(6, "A senha precisa ter mais de 6 caracteres"),
                })
            }
        }, usuarioController.CreateUsuario.bind(usuarioController)
    )
}