import { useContext } from "react";
import { CommentContext } from "./context";

export const Content = () => {
  const context = useContext(CommentContext);
  return (
    <div className="flex flex-col px-4 ml-10">
      <p className="text-base break-all">{context?.data?.content}</p>
    </div>
  );
};
