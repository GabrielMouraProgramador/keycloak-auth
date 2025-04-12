import { DomainError } from "@/domain/entities/DomainError";
import { FastifyReply, FastifyRequest } from "fastify";

type ControllerFn<T = unknown> = (
  request: FastifyRequest,
  reply: FastifyReply,
) => Promise<T>;

export const controllerHandler = (controllerFn: ControllerFn) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = await controllerFn(request, reply);
      return reply.code(200).send({ data: result, status: 200 });
    } catch (err) {
      if (err instanceof DomainError) {
        return reply.code(200).send({ error: err.message, status: 409 });
      }

      console.error(err);
      return reply
        .code(500)
        .send({ error: "Erro interno do servidor.", status: 500 });
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
