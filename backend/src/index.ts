import path from "path";
import http from "http";

import "reflect-metadata";
import dotenv from "dotenv";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { json } from "body-parser";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";

import { MyContext } from "./types";
import AppDataSource from "./database";
import { PostResolver } from "./resolvers/post";
import { __prod__ } from "./constants";
import { ChatResolver } from "./resolvers/chat";
import { MessageResolver } from "./resolvers/message";

dotenv.config();

const root = path.join(__dirname, "../");

const main = async () => {
  const dataSource = await AppDataSource.initialize();

  const app = express();

  app.use(compress());
  if (__prod__) {
    app.use(helmet());
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "*.amazonaws.com"],
        },
      })
    );
    app.use(helmet.referrerPolicy({ policy: "same-origin" }));
  }
  app.use(cors());

  app.use("/uploads", express.static(path.join(root, "uploads")));

  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const apolloServer = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [PostResolver, ChatResolver, MessageResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // Ensure we wait for our server to start
  await apolloServer.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
    json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<MyContext> => ({
        dataSource,
        req,
        res,
      }),
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT || 8000 }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || 8000}/`
  );
};

try {
  main();
} catch (error) {
  console.error(error);
}
