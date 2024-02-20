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

const corsOptions = {
  credentials: true,
  origin: true,
};

app.register(cors, corsOptions);

app.register(websocket);

app.register(createPoll);
app.register(getPolls);
app.register(getPoll);
app.register(voteOnPoll);
app.register(deletePoll);
app.register(pollResults);

const serverDomain = process.env.SERVER_DOMAIN || "localhost";
const serverPort = parseInt(process.env.SERVER_PORT || "3333", 10);

app.listen({ port: serverPort, host: serverDomain }).then(() => {
  console.log(`HTTP server running on http://${serverDomain}:${serverPort}`);
});
