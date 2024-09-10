import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';
import { utapi } from '~/server/utapi';

export const imageRouter = createTRPCRouter({
	deletImage: adminProcedure
		.input(
			z.object({
				src: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			return await utapi.deleteFiles(input.src);
		}),
	deletAllImages: adminProcedure
		.input(
			z.object({
				images: z.array(z.string()),
			}),
		)
		.mutation(async ({ input }) => {
			return await utapi.deleteFiles(input.images);
		}),
});
