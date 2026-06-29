import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ILoginAuth } from "../interfaces/auth.interface.ts";

export class AuthController {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  private async getRoleProfile(
    role: string | null,
    usuario: Record<string, any>,
  ) {
    const normalizedRole = role ? String(role).toUpperCase() : "";
    const email = usuario?.email_usuario || usuario?.email || null;
    const userId = usuario?.id_usuario || usuario?.id || null;

    const queries: Array<{ sql: string; params: any[] }> = [];

    switch (normalizedRole) {
      case "ALUNOS":
        if (email) {
          queries.push({
            sql: "SELECT id_alunos AS id, nome_aluno AS nome, email_aluno AS email, matricula_aluno, bilhete_aluno, turma_aluno, encarregado_aluno FROM alunos WHERE email_aluno = ?",
            params: [email],
          });
        }
        if (userId) {
          queries.push({
            sql: "SELECT id_alunos AS id, nome_aluno AS nome, email_aluno AS email, matricula_aluno, bilhete_aluno, turma_aluno, encarregado_aluno FROM alunos WHERE id_alunos = ?",
            params: [userId],
          });
        }
        break;
      case "RESPONSAVEL":
        if (email) {
          queries.push({
            sql: "SELECT id_responsavel AS id, nome_responsavel AS nome, email_responsavel AS email FROM responsaveis WHERE email_responsavel = ?",
            params: [email],
          });
        }
        if (userId) {
          queries.push({
            sql: "SELECT id_responsavel AS id, nome_responsavel AS nome, email_responsavel AS email FROM responsaveis WHERE id_responsavel = ?",
            params: [userId],
          });
        }
        break;
      case "PROFESSORES":
        if (email) {
          queries.push({
            sql: "SELECT id_professor AS id, nome_professor AS nome, email_professor AS email FROM professores WHERE email_professor = ?",
            params: [email],
          });
        }
        if (userId) {
          queries.push({
            sql: "SELECT id_professor AS id, nome_professor AS nome, email_professor AS email FROM professores WHERE id_professor = ?",
            params: [userId],
          });
        }
        break;
      case "ADMINISTRADORES":
        if (email) {
          queries.push({
            sql: "SELECT id_admin AS id, nome_admin AS nome, email_admin AS email FROM administradores WHERE email_admin = ?",
            params: [email],
          });
        }
        if (userId) {
          queries.push({
            sql: "SELECT id_admin AS id, nome_admin AS nome, email_admin AS email FROM administradores WHERE id_admin = ?",
            params: [userId],
          });
        }
        break;
      default:
        break;
    }

    for (const query of queries) {
      try {
        const [rows] = await this.fastify.mysql.query(query.sql, query.params);
        const rowsResult = rows as any[];

        if (rowsResult && rowsResult.length > 0) {
          const profile = rowsResult[0];
          return Object.fromEntries(
            Object.entries(profile).filter(
              ([, value]) => value !== null && value !== undefined,
            ),
          );
        }
      } catch (err) {
        console.warn(
          `Não foi possível carregar o perfil de ${normalizedRole}:`,
          err,
        );
      }
    }

    return {};
  }

  async VerifyAuth(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, senha } = request.body as ILoginAuth;

      if (!email || !senha) {
        return reply
          .status(400)
          .send({ error: "Email e senha são obrigatórios" });
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

      const senhaCorreta = await bcrypt.compare(senha, senhaHash);
      if (!senhaCorreta) {
        return reply.status(401).send({ error: "Credenciais inválidas" });
      }

      const roleRaw =
        usuario.role || usuario.role_usuario || usuario.tipoLog || null;
      const nomeUser = usuario.nome_usuario || usuario.nome || null;
      const role = roleRaw ? String(roleRaw).toUpperCase() : null;

      const payload = {
        id: usuario.id_usuario,
        name: nomeUser,
        email: usuario.email_usuario,
        role,
      };

      const roleProfile = await this.getRoleProfile(role, usuario);
      const usuarioParaFrontend = {
        ...roleProfile,
        ...payload,
      };

      const secret = process.env.JWT_SECRET || "dev_jwt_secret";
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      return reply.status(200).send({
        message: "Autenticado",
        token,
        usuario: usuarioParaFrontend,
      });
    } catch (err) {
      console.error("Erro em VerifyAuth:", err);
      return reply.status(500).send({ error: "Erro interno" });
    }
  }
}
