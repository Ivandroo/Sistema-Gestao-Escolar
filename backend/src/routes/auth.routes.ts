import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller.ts";

export async function authRoutes(fastify: FastifyInstance) {
  const authController = new AuthController(fastify);

  // Rota para autenticação (login)
  fastify.post(
    "/login",
    authController.VerifyAuth.bind(authController),
  );
}
