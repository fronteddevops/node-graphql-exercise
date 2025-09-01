import { gql } from "apollo-server-express";

export default gql`
  type Week {
    id: ID!
    userId: ID!
    startISO: String!
  }

  type Query {
    week(id: ID!): Week
    weeksByUser(userId: ID!, limit: Int, offset: Int): [Week!]!
  }
`;
