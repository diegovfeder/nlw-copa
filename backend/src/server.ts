import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import ShortUniqueId from "short-unique-id";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function main() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: true,
  });

  app.get("/api", async () => {
    return "Health check";
  });

  // Pools
  app.get("/api/pools", async () => {
    const pools = await prisma.pool.findMany({});

    return { pools };
  });

  app.get("/api/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  app.post("/api/pools", async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createPoolBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code,
      },
    });

    return reply.status(201).send({ title });
  });

  // Users
  app.get("/api/users", async () => {
    const users = await prisma.user.findMany({});
    return { users };
  });

  app.get("/api/users/count", async () => {
    const count = await prisma.user.count({});
    return { count };
  });

  // Guesses
  app.get("/api/guesses", async () => {
    const guesses = await prisma.guess.findMany({});
    return { guesses };
  });

  app.get("/api/guesses/count", async () => {
    const count = await prisma.guess.count({});
    return { count };
  });

  await app.listen({
    port: 3333,
    // host: "0.0.0.0"
  });
}

main();
