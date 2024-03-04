import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function deleteNote(app: FastifyInstance) {
  app.delete("/notes/:noteId", async (req, reply) => {
    const getNoteParams = z.object({
      noteId: z.string().uuid(),
    });

    const { noteId } = getNoteParams.parse(req.params);

    try {
      // Verifique se a enquete existe
      const existingNote = await prisma.note.findUnique({
        where: { id: noteId },
      });

      if (!existingNote) {
        return reply.status(404).send({ error: "Nota não encontrada" });
      }

      // Finalmente, remova a enquete
      await prisma.note.delete({
        where: { id: noteId },
      });

      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir a nota:", error);
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  });
}
