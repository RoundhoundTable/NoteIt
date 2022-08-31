import { ERoles } from "../enums/ERoles";

export interface User {
  __typename: string;
  username: string;
  displayName: string;
  thumbnail: string;
  createdOn: string;
}

export interface Notebook {
  __typename: string;
  name?: string;
  thumbnail?: string;
  createdOn?: string;
  description?: string;
  members?: number;
  joinedByUser?: boolean;
  role?: ERoles;
}

export interface Note {
  id: string;
  content: string;
  title: string;
  createdOn: string;
  user: User;
  notebook: Notebook;
  score: number;
  userVote: number;
  isOwner: boolean;
}

export interface Comment {
  id: string;
  content: string;
  createdOn: string;
  user: User;
  isOwner: boolean;
}

export interface Membership {
  role: ERoles;
  user: User;
  notebook: Notebook;
}

export interface Vote {
  value: number;
  user: User;
  note: Note;
}
