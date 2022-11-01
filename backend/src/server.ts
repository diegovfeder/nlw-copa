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

  // Users
  app.get("/api/users", async () => {
    const users = await prisma.user.findMany({});
    return { users };
  });

  app.get("/api/users/count", async () => {
    const count = await prisma.user.count({});
    return { count };
  });

  // app.get("/api/users/:id", async (request) => {
  //   const { id } = request.params;
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       id: Number(id),
  //     },
  //   });
  //   return { user };
  // });

  // app.post("/api/users", async (request) => {
  //   const { name, email } = request.body;
  //   const user = await prisma.user.create({
  //     data: {
  //       name,
  //       email,
  //     },
  //   });
  //   return { user };
  // });

  await app.listen({
    port: 3333,
    // host: "0.0.0.0"
  });
}

main();
