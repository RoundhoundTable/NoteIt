import mockUserResult from "../resources/mockUserSearchResult.json";
import mockNotebookResult from "../resources/mockNotebookSearchResult.json";

export interface IUserResult {
  username: string;
  displayName: string;
  thumbnail: string;
}

export interface INotebookResult {
  name: string;
  thumbnail: string;
  description: string;
  members: number;
}

interface IMockResponse {
  data: {
    search:
      | IUserResult[]
      | INotebookResult[]
      | (IUserResult | INotebookResult)[];
  };
}

export const isAnUser = (obj: any): obj is IUserResult => "username" in obj;
export const isANotebook = (obj: any): obj is INotebookResult => "name" in obj;

export const GetMockSearchResults = (
  query: string
): Promise<
  IUserResult[] | INotebookResult[] | (IUserResult | INotebookResult)[]
> => {
  return new Promise((resolve, reject) => {
    try {
      if (query.trim() === "") return [];
      let result: any[] = [];

      if (query.includes("/")) {
        const [queryType, queryParam] = query.split("/");

        if (queryType === "u") {
          result = mockUserResult.data.search.filter((result: IUserResult) =>
            result.username.startsWith(queryParam)
          );

          result.sort((a: IUserResult, b: IUserResult) => {
            if (a.username < b.username) {
              return -1;
            }
            if (a.username > b.username) {
              return 1;
            }
            return 0;
          });
        } else if (queryType === "nb") {
          result = mockNotebookResult.data.search.filter(
            (result: INotebookResult) => result.name.startsWith(queryParam)
          );

          result.sort((a: INotebookResult, b: INotebookResult) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }

        result = result.slice(0, 6);
      } else {
        const users: IUserResult[] = mockUserResult.data.search
          .filter((result: IUserResult) => result.username.startsWith(query))
          .slice(0, 3);
        const notebooks: INotebookResult[] = mockNotebookResult.data.search
          .filter((result: INotebookResult) => result.name.startsWith(query))
          .slice(0, 3);

        result = [...notebooks, ...users];
      }

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
