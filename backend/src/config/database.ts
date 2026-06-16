import fastifyMysql from '@fastify/mysql';
import { FastifyInstance } from 'fastify';

declare module 'fastify' {
    interface FastifyInstance {
        mysql: any;
    }
}

export async function connectToDatabase(fastify: FastifyInstance) {
    await fastify.register(fastifyMysql, {
        promise: true,
        // Alterar a url e colocar o nome da base de dados a usar
        connectionString: 'mysql://root:@localhost:3306/db_sgei',
    })
    .then(() => {
        console.log('Connected to MySQL database');
    })
}