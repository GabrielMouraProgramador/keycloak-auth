import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/AuthController";
import { controllerHandler } from "../controllers/Handler";

export async function AuthRoutes(app: FastifyInstance) {
  const controller = new AuthController();

  app.post(
    "/auth/register",
    controllerHandler(controller.create.bind(controller)),
  );
  app.post("/auth/login", controllerHandler(controller.login.bind(controller)));
}
