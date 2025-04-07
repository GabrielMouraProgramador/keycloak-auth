import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/AuthController";

export async function AuthRoutes(app: FastifyInstance) {
  const controller = new AuthController();

  app.post("/auth/register", async (request, reply) => {
    return await controller.create(request, reply);
  });
}
