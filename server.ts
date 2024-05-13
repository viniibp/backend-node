import { fastify } from "fastify";
import { env } from "bun";
// import { DatabaseMemory } from "./src/mock/database-memory";
import { DatabasePostgres } from "./src/db/database-postgres";

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body as any;

  await database.create({ title, description, duration });

  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const { search } = request.query as any;
  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", async (request, reply) => {
  const videoId = (request.params as any).id;
  const { title, description, duration } = request.body as any;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const videoId = (request.params as any).id;

  await database.delete(videoId);

  return reply.status(204).send();
});

server.get("/", () => {
  return "Tudo funcionando!";
});

server.listen({
  host:'0.0.0.0',
  port: Number(env.PORT ?? 3333),
});
