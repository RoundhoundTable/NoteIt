export interface INote {
  id: string;
  user: {
    username: string;
    displayName: string;
    thumbnail: string;
  };
  notebook: {
    name: string;
  };
  createdOn: string;
  title: string;
  content: string;
  score: number;
  likedByUser: number;
}
