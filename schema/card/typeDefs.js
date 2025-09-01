import { gql } from "apollo-server-express";

export default gql`
  enum CardStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  type Card {
    id: ID!
    userId: ID!
    weekId: ID!
    title: String!
    status: CardStatus!
    minutes: Int!
    createdAt: String!
  }

  type AvaInsights {
    totalMinutes: Int!
    doneCount: Int!
    focusScore: Int!
    recommendations: [String!]!
  }

  input CreateCardInput {
    weekId: ID!
    title: String!
    minutes: Int!
  }

  type Mutation {
    createCard(input: CreateCardInput!): Card!
    updateCardStatus(id: ID!, status: CardStatus!): Card!
  }

  type Query {
    avaInsights(weekId: ID!): AvaInsights!
  }
`;
