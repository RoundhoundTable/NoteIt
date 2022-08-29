import { Membership, PrismaClient, User } from "@prisma/client";
import { MutationHandlerFunc, JoinResult } from "../../../types/Handlers";

export const MembershipJoinHandler: MutationHandlerFunc<
  Membership,
  JoinResult
> = async (
  payload: Omit<Membership, "username">,
  prisma: PrismaClient,
  user: User
) => {
  const membership = await prisma.membership.create({
    data: {
      ...payload,
      username: user.username,
    },
  });

  return { joined: Boolean(membership) };
};
