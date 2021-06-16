import { FastifyPluginCallback, FastifyPluginOptions } from "fastify";

const IndexRoute: FastifyPluginCallback<FastifyPluginOptions> = (fastify, opts, done) => {
  fastify.get("/api", (a, b) => {
    b.send("YO");
  });
  done();
};

export default IndexRoute;
