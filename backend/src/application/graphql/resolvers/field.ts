import { Comment, Note, Notebook, Roles } from "@prisma/client";
import { ApolloContext } from "../context";

const Field = {
  Note: {
    score: async (
      _parent: Note,
      _: any,
      ctx: ApolloContext
    ): Promise<number> => {
      const aggregate = await ctx.prisma.vote.aggregate({
        _sum: {
          value: true,
        },
        where: {
          noteId: _parent.id,
        },
      });

      return aggregate._sum.value ?? 0;
    },
    userVote: async (
      _parent: Note,
      _: any,
      ctx: ApolloContext
    ): Promise<number> => {
      if (!ctx.user) return 0;
      const vote = await ctx.prisma.vote.findUnique({
        where: {
          username_noteId: {
            noteId: _parent.id,
            username: ctx.user.username,
          },
        },
      });

      return vote ? vote.value : 0;
    },
    isOwner: async (
      _parent: Note,
      _: any,
      ctx: ApolloContext
    ): Promise<boolean> => {
      if (!ctx.user) return false;

      return ctx.user.username === _parent.username;
    },
  },
  Notebook: {
    joinedByUser: async (
      _parent: Notebook,
      _: any,
      ctx: ApolloContext
    ): Promise<boolean> => {
      if (!ctx.user) return false;
      const membership = await ctx.prisma.membership.findFirst({
        where: {
          notebookName: _parent.name,
          username: ctx.user.username,
        },
      });

      return Boolean(membership);
    },
    role: async (
      _parent: Notebook,
      _: any,
      ctx: ApolloContext
    ): Promise<Roles> => {
      if (!ctx.user) return Roles.USER;
      const membership = await ctx.prisma.membership.findFirst({
        where: {
          notebookName: _parent.name,
          username: ctx.user.username,
        },
      });

      return membership ? membership.role : Roles.USER;
    },
    members: async (
      _parent: Notebook,
      _: any,
      ctx: ApolloContext
    ): Promise<number> => {
      const members = await ctx.prisma.membership.count({
        where: {
          notebookName: _parent.name,
        },
      });

      return members;
    },
  },
  Comment: {
    isOwner: async (
      _parent: Comment,
      _: any,
      ctx: ApolloContext
    ): Promise<boolean> => {
      if (!ctx.user) return false;

      return ctx.user.username === _parent.username;
    },
  },
};

export default Field;
