import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
const typeDefs = `
type Note {
  _id: ID!
  title: String!,
  date: Date,
  content: String!,
  email:String!
 }
 type Profile{
  name:String!
  email:String!
  password:String!
}
type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }

scalar Date
scalar Upload
type Query {
  getNote(_id: ID!): Note
  allNotes: [Note]
  getProfile:Profile
  files: [File!]
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
  email:String!
 }
  input NoteUpdateInput {
  title: String
  content: String
  email:String
 }
 input ProfileUpdate{
   name:String!
   password:String!
 }
type Mutation {
  createNote(input: NoteInput) : Note
  updateNote(_id: ID!, input: NoteUpdateInput): Note
  deleteNote(_id: ID!) : Note
  signup(email: String!, password: String!, name: String!):AuthPayload
  login(email: String!, password: String!):AuthPayload
  updateProfile(email:String!,input:ProfileUpdate):Profile
  uploadFile(file: Upload!): File!
 }
`;
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
export default schema;