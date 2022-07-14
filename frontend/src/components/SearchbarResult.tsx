import { INotebookResult, IUserResult } from "../services/GetMockSearchResults";
import { NotebookSearchbarResult } from "./NotebookSearchbarResult";
import { UserSearchbarResult } from "./UserSearchbarResult";

export const SearchbarResult = (result: IUserResult | INotebookResult) => {
    switch(result.__typename) {
        case "User":
            return <UserSearchbarResult {...result as IUserResult}/>;
        case "Notebook":
            return <NotebookSearchbarResult {...result as INotebookResult}/>
        default:
            return <p>WTF ERROR QUE CARAJO</p>
    }
}