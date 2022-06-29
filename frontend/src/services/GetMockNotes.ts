import mockNotes from "../resources/mockNotes.json";

interface INote {
  id: string;
  title: string;
  content: string;
  createdOn: string;
  likedByUser: boolean;
  score: number;
  user: {
    username: string;
    displayName: string;
    thumbnail: string;
  };
  notebook: {
    name: string;
  };
}

interface IMockResponse {
  data: {
    notes: INote[];
  };
}

export const GetMockNotes = (skip = 0): Promise<IMockResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const notes = mockNotes.data.notes.slice(skip, skip + 5);
      resolve({
        data: {
          notes,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};
