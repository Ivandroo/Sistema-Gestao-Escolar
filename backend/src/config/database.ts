import fastifyMysql from "@fastify/mysql";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    mysql: any;
  }
}

const {
  DB_HOST = "localhost",
  DB_PORT = "3306",
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "db_sgei",
} = process.env;

export async function connectToDatabase(fastify: FastifyInstance) {
  await fastify
    .register(fastifyMysql, {
      promise: true,
         host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    })
    .then(() => {
      console.log("Connected to MySQL database");
    });
}
