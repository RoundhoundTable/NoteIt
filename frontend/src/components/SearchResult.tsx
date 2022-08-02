import { NotebookSearchResult } from "./NotebookSearchResult";
import { UserSearchResult } from "./UserSearchResult";

export const SearchResult = (result: any | any) => {
  switch (result.__typename) {
    case "User":
      return <UserSearchResult {...(result as any)} />;
    case "Notebook":
      return <NotebookSearchResult {...(result as any)} />;
    default:
      return <p>WTF ERROR QUE CARAJO</p>;
  }
};
