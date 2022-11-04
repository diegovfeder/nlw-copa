import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(app: FastifyInstance) {
  app.get("/api/users", async () => {
    const users = await prisma.user.findMany({});
    return { users };
  });

  app.get("/api/users/count", async () => {
    const count = await prisma.user.count({});
    return { count };
  });
}
