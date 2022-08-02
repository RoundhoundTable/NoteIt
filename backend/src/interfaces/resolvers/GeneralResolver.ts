import { Arg, createUnionType, Query, Resolver } from "type-graphql";
import { Any } from "typeorm";
import { Services } from "../../application/services";
import { Entities } from "../../domain/entities";

const SearchResultUnion = createUnionType({
  name: "SearchResult",
  types: () => [Entities.User, Entities.Notebook],
  resolveType: (value) => {
    if ("username" in value) return Entities.User;
    else if ("name" in value) return Entities.Notebook;

    return null;
  },
});

@Resolver(() => Any)
export class GeneralResolver {
  @Query(() => [SearchResultUnion])
  async search(
    @Arg("searchQuery") searchQuery: string,
    @Arg("offset", { nullable: true }) offset: number = 0,
    @Arg("resultCount", { nullable: true }) resultCount: number = 6
  ): Promise<typeof SearchResultUnion[]> {
    let result = null;

    if (searchQuery.includes("/")) {
      const [searchType, searchParam] = searchQuery.split("/");

      if (searchType === "u")
        result = Services.User.search(searchParam, offset, resultCount);
      else if (searchType === "nb")
        result = Services.Notebook.search(searchParam, offset, resultCount);
    } else {
      const users = await Services.User.search(
        searchQuery,
        offset,
        resultCount / 2
      );
      const notebooks = await Services.Notebook.search(
        searchQuery,
        offset,
        resultCount / 2
      );

      result = [...notebooks, ...users];
    }

    return result;
  }
}
