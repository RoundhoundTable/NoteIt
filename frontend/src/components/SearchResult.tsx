import { INotebookResult, IUserResult } from "../services/GetMockSearchResults";
import { NotebookSearchResult } from "./NotebookSearchResult";
import { UserSearchResult } from "./UserSearchResult";

export const SearchResult = (result: IUserResult | INotebookResult) => {
    switch(result.__typename) {
        case "User":
            return <UserSearchResult {...result as IUserResult}/>;
        case "Notebook":
            return <NotebookSearchResult {...result as INotebookResult}/>
        default:
            return <p>WTF ERROR QUE CARAJO</p>
    }
}