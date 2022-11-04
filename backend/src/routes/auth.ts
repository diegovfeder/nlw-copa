import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/api/me",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      return { user: request.user };
    }
  );

  app.post("/api/users", async (request) => {
    const createUserBody = z.object({
      accessToken: z.string(),
    });

    const { accessToken } = createUserBody.parse(request.body);

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      });
    }

    const token = app.jwt.sign(
      { name: user.name, avatarUrl: user.avatarUrl },
      {
        sub: user.id,
        expiresIn: "7 days",
      }
    );

    return { token };
  });

  app.get("/api/auth", async () => {
    console.log("auth");

    return { auth: false };
  });
}
