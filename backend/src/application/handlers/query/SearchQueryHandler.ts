import { Notebook, User } from "@prisma/client";
import { ApolloContext } from "../../graphql/context";
import { Pagination } from "../../types/Pagination";
import { SearchResult } from "../../types/Search";

export const SearchQueryHandler = async (
  _parent: any,
  { query, ...pagination }: { query: string; limit: number; offset: number },
  ctx: ApolloContext
) => {
  const typeRegex = /(u\/)|(nb\/)/g;
  const searchRegex = /(?!(u\/)|(nb\/))\b\w+/g;

  const type = query.match(typeRegex);
  const search = query.match(searchRegex);

  let results: SearchResult = [];

  if (type && type[0] === "u/" && search) {
    results = await ctx.prisma.user.findMany({
      where: {
        username: {
          startsWith: search[0],
        },
      },
      orderBy: {
        username: "desc",
      },
      take: pagination.limit || 6,
      skip: pagination.offset || 0,
    });
  } else if (type && type[0] === "nb/" && search) {
    results = await ctx.prisma.notebook.findMany({
      where: {
        name: {
          startsWith: search[0],
        },
      },
      orderBy: {
        name: "desc",
      },
      take: pagination.limit || 6,
      skip: pagination.offset || 0,
    });
  } else if (search) {
    const notebooks = await ctx.prisma.notebook.findMany({
      where: {
        name: {
          startsWith: search[0],
        },
      },
      orderBy: {
        name: "desc",
      },
      take: pagination.limit || 3,
      skip: pagination.offset || 0,
    });

    const users = await ctx.prisma.user.findMany({
      where: {
        username: {
          startsWith: search[0],
        },
      },
      orderBy: {
        username: "desc",
      },
      take: pagination.limit || 3,
      skip: pagination.offset || 0,
    });

    results = [...notebooks, ...users];
  }

  return results;
};
