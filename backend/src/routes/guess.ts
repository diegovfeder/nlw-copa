import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function guessRoutes(app: FastifyInstance) {
  app.get("/api/guesses", async () => {
    const guesses = await prisma.guess.findMany({});
    return { guesses };
  });

  app.get("/api/guesses/count", async () => {
    const count = await prisma.guess.count({});
    return { count };
  });
}
