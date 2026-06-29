import "dotenv/config";
import Fastify, { fastify } from "fastify";
import FastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { connectToDatabase } from "./config/database.ts";
import { appRoutes } from "./app.routes.ts";

const server: Fastify.FastifyInstance = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.register(FastifyCors, { origin: "*" });

const start = async () => {
  try {
    // conectar à base de dados antes de iniciar o servidor
    await connectToDatabase(server);
    // registrar as rotas da aplicação
    await server.register(appRoutes);
    // inicializae o servidor
    await server.listen({ port: 3001, host: "0.0.0.0" });
    console.log("Server is running on http://localhost:3001");
  } catch (err) {
    console.error("Error starting the server:", err);
    // Encerrar o processo em caso de erro
    process.exit(1);
  }
};

start();
