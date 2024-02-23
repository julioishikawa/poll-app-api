import { FastifyInstance } from "fastify";
import z from "zod";
import { voting } from "../../utils/voting-pub-sub";

export async function pollResults(app: FastifyInstance) {
  app.get("/polls/:pollId/results", { websocket: true }, (conn, req) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });

    try {
      const { pollId } = getPollParams.parse(req.params);

      voting.subscribe(pollId, (message) => {
        const { pollOptionId, votes } = message;

        console.log(`Option ID: ${pollOptionId}, Votes: ${votes}`);

        conn.socket.send(JSON.stringify(message));
      });
    } catch (error) {
      console.error("Erro ao processar os parâmetros da solicitação:", error);
      conn.socket.close(1008, "Invalid pollId parameter");
    }
  });
}
