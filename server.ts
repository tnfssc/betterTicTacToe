import f from "fastify";
import Routes from "./server-src";
import ENV from "./env";

const server = f({ logger: ENV.isDev });
server.register(Routes);
server.listen(ENV.PORT, ENV.HOST, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
