import { FastifyInstance } from "fastify";
import { AdminController } from "../controllers/admin.controller.ts";
import { z } from "zod";

export async function adminRoutes(fastify: FastifyInstance) {
  const adminController = new AdminController(fastify);

  // Rota para listar todos os administradores
  fastify.get("/", adminController.listAdmins.bind(adminController));

  // Rota para criar um novo administrador
  fastify.post(
    "/",
    {
      schema: {
        body: z.object({
          nome: z
            .string()
            .min(2, "O nome precisa ter pelo menos 2 caracteres")
            .max(100),
          email: z.string().email("O email precisa ser válido"),
          bilheteUnico: z.string().max(50),
          role: z.enum(["ALUNO", "RESPONSAVEL", "PROFESSOR", "ADMIN"]),
          senha: z
            .string()
            .min(6, "A senha precisa ter pelo menos 6 caracteres")
            .max(100),
        }),
      },
    },
    adminController.createAdmin.bind(adminController),
  );
}
