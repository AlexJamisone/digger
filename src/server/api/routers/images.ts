import { utapi } from 'uploadthing/server';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const imageRouter = createTRPCRouter({
	deletImage: adminProcedure
		.input(
			z.object({
				src: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await utapi.deleteFiles(input.src);
		}),
});
