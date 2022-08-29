import { CommentMutationHandler } from "../../handlers/mutation/CommentMutationHandler";
import { LoginMutationHandler } from "../../handlers/mutation/LoginMutationHandler";
import { MembershipMutationHandler } from "../../handlers/mutation/MembershipMutationHandler";
import { NotebookMutationHandler } from "../../handlers/mutation/NotebookMutationHandler";
import { NoteMutationHandler } from "../../handlers/mutation/NoteMutationHandler";
import { RegisterMutationHandler } from "../../handlers/mutation/RegisterMutationHandler";
import { UserMutationHandler } from "../../handlers/mutation/UserMutationHandler";
import { VoteMutationHandler } from "../../handlers/mutation/VoteMutationHandler";

const Mutation = {
  register: RegisterMutationHandler,
  login: LoginMutationHandler,
  note: NoteMutationHandler,
  notebook: NotebookMutationHandler,
  membership: MembershipMutationHandler,
  vote: VoteMutationHandler,
  user: UserMutationHandler,
  comment: CommentMutationHandler,
};

export default Mutation;
