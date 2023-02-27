import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const tripMessagesRouter = createTRPCRouter({
  /**
   * query to get the messages for a trip
   * @param tripId - the id of the trip
   * @returns array of messages
   */
  getMessages: protectedProcedure
    .input(z.object({ tripId: z.string().length(25) }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.message.findMany({
          where: {
            tripId: input.tripId,
          },
          select: {
            id: true,
            text: true,
            createdAt: true,
            senderId: true,
            sender: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

  /**
   * mutation to send a message
   * @param tripId - the id of the trip
   * @param userId - the id of the user
   * @param text - the text of the message
   */
  sendMessage: protectedProcedure
    .input(
      z.object({
        tripId: z.string().length(25),
        userId: z.string().length(25),
        text: z.string().min(1).max(1000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.message.create({
          data: {
            text: input.text,
            tripId: input.tripId,
            senderId: input.userId,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
