import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function gameRoutes(app: FastifyInstance) {
  app.get("/api/games", async () => {
    const games = await prisma.game.findMany({});

    return { games };
  });

  app.get("/api/games/count", async () => {
    const count = await prisma.game.count();

    return { count };
  });
}
