import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { IShowUsuario, ICreateUsuario, IMySQLResult } from "../interfaces/usuario.interface.ts";
import bcrypt from "bcryptjs";

export class UsuarioController {
    private fastify : FastifyInstance;

    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
    }

    // Criar um novo usuario
    async CreateUsuario(request: FastifyRequest, reply: FastifyReply) {
        try {
          const { nome, email, nBilhete, role, senha } = request.body as ICreateUsuario;
          const hashed = await bcrypt.hash(senha, 10);

          const [result] = await this.fastify.mysql.query(
            "INSERT INTO usuarios (nome_usuario, email_usuario, nbilhete_usuario, tipoLog, senha_usuario ) VALUES (?,?,?,?,?)",
            [nome, email, nBilhete, role, hashed],
          );
          const insertResult = result as IMySQLResult;
          return reply
            .status(201)
            .send({
              message: "Usuario criado com sucesso",
              alunoId: insertResult.insertId,
            });
        } catch (err) {
          console.error("Erro ao criar Usuario:", err);
          return reply.status(500).send({ error: "Erro ao criar Usuario" });
        }
    }
}