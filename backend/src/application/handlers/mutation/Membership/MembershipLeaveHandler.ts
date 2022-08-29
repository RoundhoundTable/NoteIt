import { Membership, PrismaClient, User } from "@prisma/client";
import { LeaveResult, MutationHandlerFunc } from "../../../types/Handlers";

export const MembershipLeaveHandler: MutationHandlerFunc<
  Membership,
  LeaveResult
> = async (
  payload: Pick<Membership, "notebookName">,
  prisma: PrismaClient,
  user: User
) => {
  const deleted = await prisma.membership.delete({
    where: {
      username_notebookName: {
        notebookName: payload.notebookName,
        username: user.username,
      },
    },
  });

  return { left: Boolean(deleted) };
};
