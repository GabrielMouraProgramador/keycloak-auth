import { AuthRoutes } from "@/interfaces/routes/AuthRoutes";
import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify();

server.register(AuthRoutes, { prefix: "/" });

await server.register(cors, {
  origin: "*", // permite qualquer origem
});

server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
