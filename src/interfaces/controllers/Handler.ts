import { DomainError } from "@/domain/entities/DomainError";
import { FastifyReply, FastifyRequest } from "fastify";

type ControllerFn = (
  request: FastifyRequest,
  reply: FastifyReply,
) => Promise<void>;

export const controllerHandler = (controllerFn: ControllerFn) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await controllerFn(request, reply);
    } catch (err) {
      if (err instanceof DomainError) {
        return reply.code(409).send({ error: err.message });
      }

      console.error(err);
      return reply.code(500).send({ error: "Erro interno do servidor." });
    }
  };
};

////**
//
// PQ AO USAR PRECISO DE bind
// const obj = {
//   nome: "João",
//   falar() {
//     console.log(this.nome);
//   }
// };
// const falar = obj.falar;
// falar(); // undefined, porque o this não é mais o obj
// const falarComBind = obj.falar.bind(obj);
// falarComBind(); // João ✅
//
//  */
