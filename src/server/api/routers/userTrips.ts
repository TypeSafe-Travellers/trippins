import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userTripsRouter = createTRPCRouter({
  /**
   * query to get all trips
   * only query trips which the user has created or participated in
   */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.trip.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
        where: {
          participants: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    } catch (error) {
      console.error("error", error);
    }
  }),
});
