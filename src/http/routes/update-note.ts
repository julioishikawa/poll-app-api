import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function updateNote(app: FastifyInstance) {
  app.put("/notes/:noteId", async (req, reply) => {
    const updateNoteParams = z.object({
      noteId: z.string().uuid(),
    });

    const { noteId } = updateNoteParams.parse(req.params);

    const updateNoteBody = z.object({
      text: z.string(),
    });

    const { text } = updateNoteBody.parse(req.body);

    try {
      const existingNote = await prisma.note.findUnique({
        where: { id: noteId },
      });

      if (!existingNote) {
        return reply.status(404).send({ error: "Nota não encontrada" });
      }

      const updatedNote = await prisma.note.update({
        where: { id: noteId },
        data: {
          text,
          updated_at: new Date(),
        },
      });

      return reply.status(200).send(updatedNote);
    } catch (error) {
      console.error("Erro ao atualizar a nota:", error);
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  });
}
