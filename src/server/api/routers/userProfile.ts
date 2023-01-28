import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userProfileRouter = createTRPCRouter({
  /**
   * query to get the user's profile details
   * @returns user object
   */
  getProfileDetails: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.findUnique({
          select: {
            id: true,
            name: true,
            email: true,
          },
          where: {
            email: input.email,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

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
        console.error(error);
      }
    }),
});
