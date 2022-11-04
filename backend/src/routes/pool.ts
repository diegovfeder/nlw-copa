import { FastifyInstance } from "fastify";
import { z } from "zod";
import ShortUniqueId from "short-unique-id";

import { prisma } from "../lib/prisma";

export async function poolRoutes(app: FastifyInstance) {
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

    return reply.status(201).send({ code });
  });
}
