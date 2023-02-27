import { createTRPCRouter } from "./trpc";
import {
  userProfileRouter,
  userTripsRouter,
  tripMessagesRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  userProfile: userProfileRouter,
  userTrips: userTripsRouter,
  tripMessages: tripMessagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
