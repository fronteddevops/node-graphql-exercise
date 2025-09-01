import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema/index.js";
import { authMiddleware } from "./utils/auth.js";
import fs from "fs";
import path from "path";
import jwt from 'jsonwebtoken';

const __dirname = path.resolve();
const seedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "seed.json"), "utf8")
);

const token = jwt.sign({ sub: 'u1' }, 'secret'); 
console.log("token", token);

const app = express();
app.use(authMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user, seedData, cache: {} }),
});

await server.start();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
