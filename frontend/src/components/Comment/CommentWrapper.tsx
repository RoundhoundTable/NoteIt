import { PropsWithChildren, useContext, useState } from "react";
import { CommentContext } from "./context";

export const CommentWrapper = ({ children }: PropsWithChildren<any>) => {
  const context = useContext(CommentContext);
  return context.isDeleted ? (
    <></>
  ) : (
    <div className="py-2 border-l-4 border-primary-500 mt-5">{children}</div>
  );
};
