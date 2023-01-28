import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userProfileRouter = createTRPCRouter({
  /**
   * updates the name or email (or both) of the user
   * requires the user's new name or new email (or both) to be passed in
   * @param newName - the new name of the user
   * @param newEmail - the new email of the user
   * @param userId - the user's current session id
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
   */
  updateUserProfileDetails: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        newName: z.string().optional(),
        newEmail: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.update({
          where: {
            id: input.userId,
          },
          data: {
            name: input.newName || undefined,
            email: input.newEmail || undefined,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
