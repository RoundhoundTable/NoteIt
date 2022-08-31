import { Notebook, User } from "../../interfaces/Entities";
import { UserNotebook } from "../../types/Results";
import { NotebookResult } from "./NotebookResult";
import { UserResult } from "./UserResult";

interface IResultProps {
  data: UserNotebook;
  isBarResult?: boolean;
}

export const SearchResult = ({ data, isBarResult }: IResultProps) => {
  switch (data.__typename) {
    case "User":
      return <UserResult data={data as User} isBar={isBarResult} />;
    case "Notebook":
      return <NotebookResult data={data as Notebook} isBar={isBarResult} />;
    default:
      return <p>WTF ERROR QUE CARAJO</p>;
  }
};
