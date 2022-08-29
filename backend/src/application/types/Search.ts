import { Notebook, User } from "@prisma/client";

export type SearchResult = User[] | Notebook[] | (User | Notebook)[];
