import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userProfileRouter = createTRPCRouter({
  /**
   * updates the name of the user
   * requires the user's current email and the new name
   * @param userId - the user's current session id
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

  /**
   * updates the name of the user
   * requires the user's current email and the new name
   * @param userId - the user's current session id
   * @param newEmail - the new email of the user
   */
  updateEmail: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        newEmail: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.update({
          where: {
            id: input.userId,
          },
          data: {
            name: input.newEmail,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
