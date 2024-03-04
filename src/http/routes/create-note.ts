import dotenv from "dotenv";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

dotenv.config();

export async function createNote(app: FastifyInstance) {
  app.post("/notes", async (req, reply) => {
    const createNoteBody = z.object({
      text: z.string(),
    });

    const { text } = createNoteBody.parse(req.body);

    try {
      const note = await prisma.note.create({
        data: {
          text,
        },
      });

      return reply.status(201).send({ noteId: note.id });
    } catch (error) {
      console.error("Error creating note:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}
