import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ILoginAuth,
  IVerifyAuth,
  IMySQLResult,
} from "../interfaces/auth.interface.ts";

export class AuthController {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async VerifyAuth(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, senha } = request.body as ILoginAuth;

      if (!email || !senha) {
        return reply.status(400).send({ error: "Email e senha são obrigatórios" });
      }

      const [rows] = await this.fastify.mysql.query(
        "SELECT * FROM usuarios WHERE email_usuario = ?",
        [email],
      );

      const usuarios = rows as any[];
      if (!usuarios || usuarios.length === 0) {
        return reply.status(401).send({ error: "Credenciais inválidas" });
      }

      const usuario = usuarios[0];
      const senhaHash = usuario.senha_usuario || usuario.senha || "";

      if (!senhaHash) {
        return reply.status(401).send({ error: "Credenciais inválidas" });
      }

      // compara a senha fornecida com o hash armazenado
      const senhaCorreta = await bcrypt.compare(senha, senhaHash);
      if (!senhaCorreta) {
        return reply.status(401).send({ error: "Credenciais inválidas" });
      }

      // verificar role e criar token JWT (normaliza para maiúsculas)
      const roleRaw = usuario.role || usuario.role_usuario || usuario.tipoLog || null;
      const role = roleRaw ? String(roleRaw).toUpperCase() : null;

      const payload = {
        id: usuario.id_usuario,
        email: usuario.email_usuario,
        role,
      };

      const secret = process.env.JWT_SECRET || "dev_jwt_secret";
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      return reply.status(200).send({ message: "Autenticado", token, usuario: payload });
      console.log(`${usuario} : ${payload} // ${token} `)
    } catch (err) {
      console.error("Erro em VerifyAuth:", err);
      return reply.status(500).send({ error: "Erro interno" });
    }
  }
}
