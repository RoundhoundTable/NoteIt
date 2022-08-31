import { gql } from "apollo-server";

const typeDefs = gql`
  scalar DateTime

  union NoteMutationResult =
      NoteCreateResult
    | NoteEditResult
    | NoteDeleteResult
  union NotebookMutationResult =
      NotebookCreateResult
    | NotebookEditResult
    | NotebookDeleteResult
  union MembershipMutationResult =
      MembershipJoinResult
    | MembershipLeaveResult
    | MembershipKickResult
    | MembershipEditResult
  union CommentMutationResult = CommentCreateResult | CommentDeleteResult
  union UserMutationResult = UserEditResult
  union SearchResult = User | Notebook

  type Query {
    note(id: String!): Note
    notes(
      username: String
      notebook: String
      limit: Int!
      offset: Int!
    ): NoteScroll
    user(username: String!): User
    _user: User
    comments(noteId: String!, limit: Int!, offset: Int!): CommentScroll
    notebook(name: String!): Notebook
    search(query: String!, limit: Int!, offset: Int!): [SearchResult]
    feed(limit: Int!, offset: Int!): NoteScroll
    members(notebook: String!): [Membership]
    joined: [Membership]
  }

  type NoteScroll {
    hasMore: Boolean
    notes: [Note]
  }

  type CommentScroll {
    hasMore: Boolean
    comments: [Comment]
  }

  type Mutation {
    register(credentials: RegisterMutationInput!): String
    login(credentials: LoginMutationInput!): String
    note(
      type: NoteMutationType!
      payload: NoteMutationInput
    ): NoteMutationResult
    notebook(
      type: NotebookMutationType!
      payload: NotebookMutationInput
    ): NotebookMutationResult
    membership(
      type: MembershipMutationType!
      payload: MembershipMutationInput
    ): MembershipMutationResult
    comment(
      type: CommentMutationType!
      payload: CommentMutationInput
    ): CommentMutationResult
    vote(noteId: String!, value: Int!): Int
    user(type: UserMutationType!, payload: UserMutationInput): UserEditResult
  }

  type User {
    username: String
    displayName: String
    thumbnail: String
    createdOn: DateTime
  }

  type Notebook {
    name: String
    thumbnail: String
    createdOn: DateTime
    description: String
    members: Int
    joinedByUser: Boolean
    role: Roles
  }

  type Note {
    id: ID
    content: String
    title: String
    createdOn: DateTime
    user: User
    notebook: Notebook
    score: Int
    userVote: Int
    isOwner: Boolean
  }

  type Comment {
    id: ID
    content: String
    createdOn: DateTime
    user: User
    isOwner: Boolean
  }

  type Membership {
    role: Roles
    user: User
    notebook: Notebook
  }

  type Vote {
    value: Int
    user: User
    note: Note
  }

  type NoteCreateResult {
    created: String
  }

  type NotebookCreateResult {
    created: String
  }

  type CommentCreateResult {
    created: String
  }

  type NoteEditResult {
    edited: Boolean
  }

  type NotebookEditResult {
    edited: Boolean
  }

  type MembershipEditResult {
    edited: Boolean
  }

  type UserEditResult {
    edited: Boolean
  }

  type NoteDeleteResult {
    deleted: Boolean
  }

  type NotebookDeleteResult {
    deleted: Boolean
  }

  type CommentDeleteResult {
    deleted: Boolean
  }

  type MembershipJoinResult {
    joined: Boolean
  }

  type MembershipLeaveResult {
    left: Boolean
  }

  type MembershipKickResult {
    kicked: Boolean
  }

  enum Roles {
    USER
    MODERATOR
    OWNER
  }

  enum NoteMutationType {
    CREATE
    EDIT
    DELETE
  }

  enum NotebookMutationType {
    CREATE
    EDIT
    DELETE
  }

  enum MembershipMutationType {
    JOIN
    LEAVE
    KICK
    EDIT
  }

  enum CommentMutationType {
    CREATE
    DELETE
  }

  enum UserMutationType {
    EDIT
  }

  input RegisterMutationInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  input LoginMutationInput {
    email: String!
    password: String!
  }

  input NoteMutationInput {
    id: String
    content: String
    title: String
    notebookName: String
  }

  input NotebookMutationInput {
    name: String
    description: String
    thumbnail: String
  }

  input MembershipMutationInput {
    username: String
    notebookName: String!
    role: Roles
  }

  input CommentMutationInput {
    id: String
    content: String
    noteId: String
  }

  input UserMutationInput {
    displayName: String
    thumbnail: String
  }
`;

export default typeDefs;
