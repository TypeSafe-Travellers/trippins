import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userProfileRouter = createTRPCRouter({
  /**
   * updates the name of the user
   * requires the user's current email and the new name
   * @param currentEmail - the user's current email
   * @param newName - the new name of the user
   */
  updateName: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        newName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.update({
          where: {
            id: input.userId,
          },
          data: {
            name: input.newName,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
