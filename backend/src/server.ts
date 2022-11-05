import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";

async function main() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: true,
  });

  await app.register(jwt, {
    secret: "nlw-copa-2022",
  });

  app.get("/", async () => {
    return "HELLO NLW COPA 2022";
  });

  app.get("/api", async () => {
    return "Health check";
  });

  await app.register(authRoutes);
  await app.register(gameRoutes);
  await app.register(guessRoutes);
  await app.register(poolRoutes);
  await app.register(userRoutes);

  await app.listen({
    port: 3333,
    host: "0.0.0.0",
  });
}

main();
