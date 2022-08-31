import { useContext } from "react";
import { formatDate } from "../../utils/formatDate";
import { CommentContext } from "./context";

export const Metadata = () => {
  const context = useContext(CommentContext);

  return (
    <div className="ml-2">
      <p className="text-primary-800 text-base font-medium">
        {context.data?.user.displayName}
      </p>
      <p className="text-primary-400 text-xs font-extralight">
        {formatDate(context.data?.createdOn!)}
      </p>
    </div>
  );
};
