import { ApolloContext } from "../context";

const Union = {
  NoteMutationResult: {
    __resolveType(_parent: any, _: ApolloContext, __: any) {
      if (_parent.deleted) return "NoteDeleteResult";
      if (_parent.edited) return "NoteEditResult";

      return "NoteCreateResult";
    },
  },
  NotebookMutationResult: {
    __resolveType(_parent: any, _: ApolloContext, __: any) {
      if (_parent.deleted) return "NotebookDeleteResult";
      if (_parent.edited) return "NotebookEditResult";

      return "NotebookCreateResult";
    },
  },
  MembershipMutationResult: {
    __resolveType(_parent: any, _: ApolloContext, __: any) {
      if (_parent.kicked) return "MembershipKickResult";
      if (_parent.left) return "MembershipLeaveResult";
      if (_parent.edited) return "MembershipEditResult";

      return "MembershipJoinResult";
    },
  },
  CommentMutationResult: {
    __resolveType(_parent: any, _: ApolloContext, __: any) {
      if (_parent.deleted) return "CommentDeleteResult";
      return "CommentCreateResult";
    },
  },
  UserMutationResult: {
    __resolveType(_parent: any, _: ApolloContext, __: any) {
      return "UserEditResult";
    },
  },
  SearchResult: {
    __resolveType(_parent: any, _: ApolloContext, __: any) {
      if ("name" in _parent) return "Notebook";
      return "User";
    },
  },
};

export default Union;
