import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function main() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: true,
    // origin: "www.example.com",
  });

  app.get("/", async () => {
    return "Hello World!";
  });

  app.get("/pools/count", async () => {
    const count = await prisma.pool.count({});

    return { count };
  });

  app.get("/pools", async () => {
    const count = await prisma.pool.findMany({});

    return { count };
  });

  await app.listen({ port: 3333, host: "0.0.0.0" });
}

main();
