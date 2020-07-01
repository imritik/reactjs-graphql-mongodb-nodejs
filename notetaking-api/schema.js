import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
const typeDefs = `
type Note {
  _id: ID!
  title: String!,
  date: Date,
  content: String!
 }
scalar Date
type Query {
  getNote(_id: ID!): Note
  allNotes: [Note]
 }
 type AuthPayload {
  user: User
}
type User {
  name: String!
  email: String!
}
input NoteInput {
  title: String!
  content: String!
 }
  input NoteUpdateInput {
  title: String
  content: String
 }
type Mutation {
  createNote(input: NoteInput) : Note
  updateNote(_id: ID!, input: NoteUpdateInput): Note
  deleteNote(_id: ID!) : Note
  signup(email: String!, password: String!, name: String!):AuthPayload
  login(email: String!, password: String!):AuthPayload
 }
`;
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
export default schema;