import { pointsRouter } from '~/server/api/routers/points';
import { createTRPCRouter } from '~/server/api/trpc';
import { commentsRouter } from './routers/comments';
import { imageRouter } from './routers/images';
import { userRouter } from './routers/user';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	points: pointsRouter,
	user: userRouter,
	images: imageRouter,
	comments: commentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
