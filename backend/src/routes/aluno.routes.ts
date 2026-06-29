import { FastifyInstance } from "fastify";
import { AlunoController } from "../controllers/aluno.controller.ts";
import { z } from "zod";

export async function alunosRoutes(fastify: FastifyInstance) {
  const alunoController = new AlunoController(fastify);

  // Rota para listar todos os alunos
  fastify.get("/api/alunos", alunoController.ListAlunos.bind(alunoController));

  // Rota para verificar informações de aluno
  fastify.get("/api/verify-aluno/:email", alunoController.VerifyAluno.bind(alunoController))

  // Rota para criar um novo aluno
  fastify.post(
    "/api/alunos",
    {
      schema: {
        body: z.object({
          name: z
            .string()
            .min(2, "O nome precisa ter pelo menos 2 caracteres")
            .max(100),
          email: z.string().email("O email precisa ser válido"),
          bilheteUnico: z.string().optional(),
        }),
      },
    },
    alunoController.CreateAluno.bind(alunoController),
  );
}
