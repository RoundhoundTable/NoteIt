export interface INotebook {
  __typename: string;
  name: string;
  thumbnail: string;
  createdOn: string;
  description: string;
  joinedByUser: boolean;
  memberCount: number;
}
