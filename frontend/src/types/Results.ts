import { Notebook, User } from "../interfaces/Entities";

export type UserNotebook = User | Notebook;
export type SearchQueryResult = User[] | Notebook[] | UserNotebook[];
