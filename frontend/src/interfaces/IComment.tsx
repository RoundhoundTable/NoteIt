export interface IComment {
  id: string;
  user: {
    username: string;
    displayName: string;
    thumbnail: string;
  };
  createdOn: string;
  content: string;
}
