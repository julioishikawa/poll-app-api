import fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "fastify-cors";
import websocket from "@fastify/websocket";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { getPolls } from "./routes/get-polls";
import { deletePoll } from "./routes/delete-poll";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(cookie, {
  secret: "polls-app-shuharib0t",
  hook: "onRequest",
});

app.register(cors);

app.register(websocket);

app.register(createPoll);
app.register(getPolls);
app.register(getPoll);
app.register(voteOnPoll);
app.register(deletePoll);

app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running");
});
