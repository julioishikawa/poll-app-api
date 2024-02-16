import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function deletePoll(app: FastifyInstance) {
  app.delete("/polls/:pollId", async (req, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = getPollParams.parse(req.params);

    try {
      // Verifique se a enquete existe
      const existingPoll = await prisma.poll.findUnique({
        where: { id: pollId },
        include: { options: true },
      });

      if (!existingPoll) {
        return reply.status(404).send({ error: "Enquete não encontrada" });
      }

      // Remova registros dependentes, como votos
      await prisma.vote.deleteMany({
        where: {
          pollOptionId: { in: existingPoll.options.map((opt) => opt.id) },
        },
      });

      // Em seguida, remova as opções de enquete
      await prisma.pollOption.deleteMany({
        where: { pollId: pollId },
      });

      // Finalmente, remova a enquete
      await prisma.poll.delete({
        where: { id: pollId },
      });

      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir enquete:", error);
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  });
}
