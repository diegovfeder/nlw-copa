import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function guessRoutes(app: FastifyInstance) {
  app.get("/api/guesses", async () => {
    const guesses = await prisma.guess.findMany({});
    return { guesses };
  });

  app.get("/api/guesses/count", async () => {
    const count = await prisma.guess.count({});
    return { count };
  });

  app.post(
    "/api/pools/:poolId/games/:gameId/guesses",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const createGuessParams = z.object({
        poolId: z.string(),
        gameId: z.string(),
      });

      const createGuessBody = z.object({
        firstTeamScore: z.number(),
        secondTeamScore: z.number(),
      });

      const { poolId, gameId } = createGuessParams.parse(request.params);
      const { firstTeamScore, secondTeamScore } = createGuessBody.parse(
        request.body
      );

      const participant = await prisma.participant.findUnique({
        where: {
          userId_poolId: {
            poolId,
            userId: request.user.sub,
          },
        },
      });

      if (!participant) {
        return reply.status(404).send({
          message: "You're not allowed to create a guess inside this pool",
        });
      }

      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            participantId: participant.id,
            gameId,
          },
        },
      });

      if (guess) {
        return reply.status(409).send({
          message: "You already have a guess for this game on this pool",
        });
      }

      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });

      if (!game) {
        return reply.status(404).send({
          message: "Game not found",
        });
      }

      if (game.date < new Date()) {
        return reply.status(409).send({
          message: "You can't create a guess for a game that already happened",
        });
      }

      await prisma.guess.create({
        data: {
          gameId,
          participantId: participant.id,
          firstTeamScore,
          secondTeamScore,
        },
      });

      return reply.status(201).send({
        message: "Guess created successfully",
      });
    }
  );
}
