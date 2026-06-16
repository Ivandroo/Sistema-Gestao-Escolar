import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import {
  ICreateAdmin,
  IMySQLResult,
  IShowAdmin,
  IUpdateAdmin,
} from "../interfaces/admin.interface.ts";
import bcrypt from "bcryptjs";

export class AdminController {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  // Listar todos os administradores
  async listAdmins(request: FastifyRequest, reply: FastifyReply) {
    try {
      const [AdminRows] = await this.fastify.mysql.query(
        "SELECT id, nome, email, criadoEm, actualizadoEm FROM Admins",
      );
      return reply.send(AdminRows as IShowAdmin[]);
    } catch (err) {
      console.error("Erro ao listar administradores:", err);
      return reply
        .status(500)
        .send({ error: "Erro ao listar administradores" });
    }
  }

  // Criar um novo administrador
  async createAdmin(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, email, bilheteUnico, role, senha } = request.body as ICreateAdmin;
      const hashed = await bcrypt.hash(senha, 10);
      const [result] = await this.fastify.mysql.query(
        "INSERT INTO admin (nome, email, bilheteUnico, tipoLog, senha) VALUES (?,?,?,?,?)",
        [nome, email, bilheteUnico, role, hashed],
      );
      const insertResult = result as IMySQLResult;
      return reply
        .status(201)
        .send({
          message: "Administrador criado com sucesso",
          adminId: insertResult.insertId,
        });
    } catch (err) {
      console.error("Erro ao criar administrador:", err);
      return reply.status(500).send({ error: "Erro ao criar administrador" });
    }
  }
}
