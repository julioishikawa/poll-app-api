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
      const existingPoll = await prisma.poll.findUnique({
        where: { id: pollId },
        include: { options: true },
      });

      if (!existingPoll) {
        return reply.status(404).send({ error: "Enquete não encontrada" });
      }

      await prisma.vote.deleteMany({
        where: {
          pollOptionId: { in: existingPoll.options.map((opt) => opt.id) },
        },
      });

      await prisma.pollOption.deleteMany({
        where: { pollId: pollId },
      });

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
