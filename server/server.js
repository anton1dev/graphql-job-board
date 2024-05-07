import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";

import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { readFile } from "node:fs/promises";
import dotenv from 'dotenv';

import { resolvers } from "./resolvers.js";
import { getUser } from "./db/users.js";
import { createCompanyLoader } from "./db/companies.js";

dotenv.config();
const PORT = process.env.PORT || 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFile("./schema.graphql", "utf8");

async function getContext({ req }) {
  const companyLoader = createCompanyLoader();
  const context = { companyLoader };
  if (req.auth) {
    context.user = await getUser(req.auth.sub);
  }
  return context;
}

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer, { context: getContext }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
