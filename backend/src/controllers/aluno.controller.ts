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
        "SELECT id_alunos, nome_aluno, email_aluno, matricula_aluno, bilhete_aluno, turma_aluno, encarregado_aluno FROM alunos",
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

  // Verificar informações de um aluno
  async VerifyAluno(request: FastifyRequest, reply: FastifyReply) {
    try {

      const { id } = request.params as {id: string}
      const [result] = await this.fastify.mysql.query("SELECT id_alunos, nome_aluno, matricula_aluno, bilhete_aluno, turma_aluno, encarregado_aluno FROM alunos WHERE id_alunos = ?", [id])

      return reply.send(result as IShowAluno)

    } catch(err) {
      console.error("Erro ao listar informações do aluno:", err);
      return reply.status(500).send({ error: "Erro ao listar informações" });
    }
  }
}
