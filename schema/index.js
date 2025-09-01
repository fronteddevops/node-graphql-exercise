import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import userTypeDefs from "./user/typeDefs.js";
import userResolvers from "./user/resolvers.js";
import weekTypeDefs from "./week/typeDefs.js";
import weekResolvers from "./week/resolvers.js";
import cardTypeDefs from "./card/typeDefs.js";
import cardResolvers from "./card/resolvers.js";
import sessionTypeDefs from "./session/typeDefs.js";
import sessionResolvers from "./session/resolvers.js";

export const typeDefs = mergeTypeDefs([
  userTypeDefs,
  weekTypeDefs,
  cardTypeDefs,
  sessionTypeDefs,
]);
export const resolvers = mergeResolvers([
  userResolvers,
  weekResolvers,
  cardResolvers,
  sessionResolvers,
]);
