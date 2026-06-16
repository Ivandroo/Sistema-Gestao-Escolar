import { FastifyInstance } from "fastify";
import { adminRoutes } from "./routes/admin.routes.ts";
import { usuariosRoutes } from "./routes/usuario.routes.ts";
import { authRoutes } from "./routes/auth.routes.ts";
import { alunosRoutes } from "./routes/aluno.routes.ts";

export async function appRoutes(fastify: FastifyInstance) {
  await fastify.register(async (fastify) => {
    // Definir a rota corretamente dentro do escopo do registro
    fastify.get("/hello", async (request, reply) => {
      return { message: "Hello, World!" };
    });
  });

  // await fastify.register(professorRoutes, { prefix: '/api/professores '});

  await fastify.register(adminRoutes, { prefix: "/api/admins" });
  await fastify.register(usuariosRoutes, { prefix: "/api/usuarios"});
  await fastify.register(authRoutes, { prefix: "/api" });
  await fastify.register(alunosRoutes);
}
