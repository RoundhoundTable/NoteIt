import { NotebookSearchbarResult } from "./NotebookSearchbarResult";
import { UserSearchbarResult } from "./UserSearchbarResult";

export const SearchbarResult = (result: any) => {
  switch (result.__typename) {
    case "User":
      return <UserSearchbarResult {...(result as any)} />;
    case "Notebook":
      return <NotebookSearchbarResult {...(result as any)} />;
    default:
      return <p>WTF ERROR QUE CARAJO</p>;
  }
};
