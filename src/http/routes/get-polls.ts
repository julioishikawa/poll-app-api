import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getPolls(app: FastifyInstance) {
  app.get("/polls", async (req, reply) => {
    try {
      const polls = await prisma.poll.findMany({
        include: {
          options: true,
        },
      });

      reply.send(polls);
    } catch (error) {
      console.error("Erro ao buscar enquetes:", error);
      reply.status(500).send({ message: "Erro ao buscar enquetes." });
    }
  });
}
