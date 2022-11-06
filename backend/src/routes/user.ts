import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(app: FastifyInstance) {
  app.get("/users", async () => {
    const users = await prisma.user.findMany({});
    return { users };
  });

  app.get("/users/count", async () => {
    const count = await prisma.user.count({});
    return { count };
  });
}
