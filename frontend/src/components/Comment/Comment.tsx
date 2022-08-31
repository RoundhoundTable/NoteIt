import { useState } from "react";
import { UserAvatar } from "../UserAvatar";
import { CommentWrapper } from "./CommentWrapper";
import { Content } from "./Content";
import { Header } from "./Header";
import { Metadata } from "./Metadata";
import { Comment as CommentEntity } from "../../interfaces/Entities";
import { CommentContext } from "./context";

export const Comment = ({ data }: { data: CommentEntity }) => {
  const [isDeleted, setDelete] = useState<boolean>(false);

  return (
    <CommentContext.Provider value={{ data, isDeleted, delete: setDelete }}>
      <CommentWrapper>
        <Header>
          <UserAvatar src={data.user.thumbnail} />
          <Metadata />
        </Header>
        <Content />
      </CommentWrapper>
    </CommentContext.Provider>
  );
};
