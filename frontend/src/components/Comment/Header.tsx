import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/AuthProvider";
import { ECommentMutationType } from "../../enums/EMutationTypes";
import { comment } from "../../graphql/mutations/comment";
import { IModalProps } from "../../interfaces/IModalProps";
import { Modal } from "../Modal";
import { CommentContext } from "./context";

export const Header = ({ children }: PropsWithChildren<any>) => {
  const { currentUser } = useAuth() as AuthContext;
  const context = useContext(CommentContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [DeleteComment, { data }] = useMutation(comment);

  const toggleModal = () => setShowModal(!showModal);

  const deleteComment = () => {
    DeleteComment({
      variables: {
        type: ECommentMutationType.DELETE,
        payload: {
          id: context.data?.id,
        },
      },
    });
  };

  const deleteCommentModal: IModalProps = {
    message: "¿Estas seguro de que deseas eliminar el comentario?",
    acceptOption: {
      text: "Aceptar",
      onClick: deleteComment,
    },
    cancelOption: {
      text: "Cancelar",
      onClick: toggleModal,
    },
  };

  useEffect(() => {
    if (data?.comment?.deleted) {
      context.delete!(true);
      toggleModal();
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-row justify-between w-full">
        <Link to={`/u/${context.data?.user.username}`}>
          <div className="flex flex-row items-center p-2">{children}</div>
        </Link>
        {currentUser && context.data?.isOwner && (
          <Icon
            icon="bi:trash-fill"
            className="text-primary-500"
            onClick={toggleModal}
          />
        )}
      </div>
      {showModal && <Modal {...deleteCommentModal} />}
    </>
  );
};
