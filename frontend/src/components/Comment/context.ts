import { createContext, Dispatch, SetStateAction } from "react";
import { Comment } from "../../interfaces/Entities";

export const CommentContext = createContext<{
  data: Comment | null;
  isDeleted: boolean;
  delete?: Dispatch<SetStateAction<boolean>>;
}>({ data: null, isDeleted: false });
