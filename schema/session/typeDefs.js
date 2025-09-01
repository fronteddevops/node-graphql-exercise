import { gql } from "apollo-server-express";

export default gql`
  type Session {
    id: ID!
    userId: ID!
    startedAt: String!
    endedAt: String!
    durationMinutes: Int!
  }

  type Query {
    sessionsByUser(userId: ID!): [Session!]!
  }
`;
