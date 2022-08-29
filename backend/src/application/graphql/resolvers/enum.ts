import {
  ECommentMutationType,
  EMembershipMutationType,
  ENotebookMutationType,
  ENoteMutationType,
  EUserMutationType,
} from "../../enumerators/EMutationTypes";

const Enum = {
  NoteMutationType: {
    CREATE: ENoteMutationType.CREATE,
    EDIT: ENoteMutationType.EDIT,
    DELETE: ENoteMutationType.DELETE,
  },
  NotebookMutationType: {
    CREATE: ENotebookMutationType.CREATE,
    EDIT: ENotebookMutationType.EDIT,
    DELETE: ENotebookMutationType.DELETE,
  },
  MembershipMutationType: {
    JOIN: EMembershipMutationType.JOIN,
    LEAVE: EMembershipMutationType.LEAVE,
    KICK: EMembershipMutationType.KICK,
    EDIT: EMembershipMutationType.EDIT,
  },
  CommentMutationType: {
    CREATE: ECommentMutationType.CREATE,
    DELETE: ECommentMutationType.DELETE,
  },
  UserMutationType: {
    EDIT: EUserMutationType.EDIT,
  },
};

export default Enum;
