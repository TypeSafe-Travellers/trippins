import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userTripsRouter = createTRPCRouter({
  /**
   * query to get all trips
   * only query trips which the user has created or participated in
   */
  getAll: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.trip.findMany({
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
          },
          where: {
            participants: {
              some: {
                id: input.userId,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    }),

  /**
   * query to get all trip ids
   * used to check if a trip exists
   */
  getAllTripIds: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.trip.findMany({
        select: {
          id: true,
        },
      });
    } catch (error) {
      console.error("error", error);
    }
  }),

  /**
   * query to get count of trips a user has created or participated in or is banned from
   * @param userId - id of the user
   */
  getTripsByUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const isCreator = await ctx.prisma.trip.findMany({
          where: {
            adminId: input.userId,
          },
          select: {
            _count: {
              select: {
                participants: true,
              },
            },
          },
        });

        const isParticipant = await ctx.prisma.trip.findMany({
          where: {
            participants: {
              some: {
                id: input.userId,
              },
            },
          },
          select: {
            _count: {
              select: {
                participants: true,
              },
            },
          },
        });

        const isBanned = await ctx.prisma.trip.findMany({
          where: {
            bannedUsers: {
              some: {
                id: input.userId,
              },
            },
          },
          select: {
            _count: {
              select: {
                participants: true,
              },
            },
          },
        });

        return { isCreator, isParticipant, isBanned };
      } catch (error) {
        console.error("error", error);
      }
    }),

  /**
   * query to get a specific trip
   * @param tripId - id of the trip
   * @returns trip object
   */
  getSpecificTrip: protectedProcedure
    .input(z.object({ tripId: z.string().length(25) }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.trip.findUnique({
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            startDate: true,
            endDate: true,
            adminId: true,
            budget: true,
            participants: {
              select: {
                id: true,
                name: true,
              },
            },
            bannedUsers: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          where: {
            id: input.tripId,
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    }),

  /**
   * query to get all participants of a trip
   * @param tripId - id of the trip
   * @returns array of user ids
   */
  getTripParticipants: protectedProcedure
    .input(z.object({ tripId: z.string().length(25) }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.trip.findMany({
          select: {
            participants: {
              select: {
                id: true,
              },
            },
          },
          where: {
            id: input.tripId,
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    }),

  /**
   * query to get all banned participants of a trip
   * @param tripId - id of the trip
   * @returns array of user ids
   */
  getBannedParticipants: protectedProcedure
    .input(z.object({ tripId: z.string().length(25) }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.trip.findMany({
          select: {
            bannedUsers: {
              select: {
                id: true,
              },
            },
          },
          where: {
            id: input.tripId,
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    }),

  /**
   * mutation to create a new trip
   * @param userId - id of the user who created the trip
   * @param name - name of the trip
   * @param description - description of the trip
   * @param startDate - start date of the trip
   * @param endDate - end date of the trip
   * @param adminId - id of the user who created the trip
   * @param budget - budget of the trip
   * @param participants - id of users who are participating in the trip
   */
  createTrip: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().min(3).max(50),
        description: z.string().min(3).max(1000),
        startDate: z.date(),
        endDate: z.date(),
        budget: z.number().min(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.trip.create({
          data: {
            name: input.name,
            description: input.description,
            startDate: input.startDate,
            endDate: input.endDate,
            adminId: input.userId,
            budget: input.budget,
            participants: {
              connect: {
                id: input.userId,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

  /**
   * mutation to edit trip details
   * @param tripId - id of the trip
   * @param name - name of the trip
   * @param description - description of the trip
   * @param budget - budget of the trip
   * @param startDate - start date of the trip
   * @param endDate - end date of the trip
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
   */
  editTrip: protectedProcedure
    .input(
      z.object({
        tripId: z.string().length(25),
        name: z.string().min(3).max(50).optional(),
        description: z.string().min(3).max(1000).optional(),
        budget: z.number().min(0).optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.trip.update({
          where: {
            id: input.tripId,
          },
          data: {
            name: input.name ?? undefined,
            description: input.description ?? undefined,
            startDate: input.startDate ?? undefined,
            endDate: input.endDate ?? undefined,
            budget: input.budget ?? undefined,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

  /**
   * mutation to delete a trip
   * @param tripId - id of the trip
   */
  deleteTrip: protectedProcedure
    .input(z.object({ tripId: z.string().length(25) }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.trip.delete({
          where: {
            id: input.tripId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  /**
   * mutation to add a participant to a trip
   * trip code is of length 25 characters
   * @param userId - id of the user to be added
   * @param tripId - id of the trip (trip code in client)
   */
  addParticipant: protectedProcedure
    .input(z.object({ tripId: z.string().length(25), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.trip.update({
          where: {
            id: input.tripId,
          },
          data: {
            participants: {
              connect: {
                id: input.userId,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

  /**
   * mutation to remove a participant from a trip
   * @param userId - id of the user to be removed
   * @param tripId - id of the trip (trip code in client)
   */
  removeParticipant: protectedProcedure
    .input(z.object({ tripId: z.string().length(25), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.trip.update({
          where: {
            id: input.tripId,
          },
          data: {
            participants: {
              disconnect: {
                id: input.userId,
              },
            },
            bannedUsers: {
              connect: {
                id: input.userId,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

  /**
   * mutation to unban a participant from a trip
   * @param userId - id of the user to be unbanned
   * @param tripId - id of the trip (trip code in client)
   */
  unBanParticipant: protectedProcedure
    .input(z.object({ tripId: z.string().min(25).max(25), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.trip.update({
          where: {
            id: input.tripId,
          },
          data: {
            participants: {
              connect: {
                id: input.userId,
              },
            },
            bannedUsers: {
              disconnect: {
                id: input.userId,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
