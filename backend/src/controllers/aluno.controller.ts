import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import {
  IShowAluno,
  ICreateAluno,
  IMySQLResult,
  IUpdateAluno,
} from "../interfaces/aluno.interface.ts";

export class AlunoController {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  // Listar alunos
  async ListAlunos(request: FastifyRequest, reply: FastifyReply) {
    try {
      const [AlunoRows] = await this.fastify.mysql.query(
        "SELECT id_alunos, nome_aluno, email_aluno FROM alunos",
      );
      return reply.send(AlunoRows as IShowAluno[]);
    } catch (err) {
      console.error("Erro ao listar alunos:", err);
      return reply.status(500).send({ error: "Erro ao listar alunos" });
    }
  }

  // Criar alunos
  async CreateAluno(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, email, bilheteUnico } = request.body as ICreateAluno;
      const [result] = await this.fastify.mysql.query(
        "INSERT INTO alunos (nome, email, bilhete ) VALUES (?,?,?)",
        [nome, email, bilheteUnico],
      );
      const insertResult = result as IMySQLResult;
      return reply
        .status(201)
        .send({
          message: "Aluno criado com sucesso",
          alunoId: insertResult.insertId,
        });
    } catch (err) {
      console.error("Erro ao criar aluno:", err);
      return reply.status(500).send({ error: "Erro ao criar aluno" });
    }
  }
}
