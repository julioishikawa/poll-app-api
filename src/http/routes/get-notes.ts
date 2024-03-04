import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getNotes(app: FastifyInstance) {
  app.get("/notes", async (req, reply) => {
    try {
      const notes = await prisma.note.findMany();
      reply.send(notes);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
      reply.status(500).send({ message: "Erro ao buscar notas." });
    }
  });
}
